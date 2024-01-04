import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import csvtojson from 'csvtojson';
import gql from 'graphql-tag';
import camelCase from 'lodash/camelCase';
import ALL_IFORM_GRID from 'queries/allIformGrid';
import IFORM_TEMP from 'queries/iformTemp';
import UPDATE_IFORM_TEMP from 'mutations/updateIformTemp';
import HEADER_CODE from 'queries/headerCode';
import setGridInput from 'utils/setGridInput';
import compares from 'constants/compInputOptions';
import { string, shape } from 'prop-types';
import { withApollo } from 'react-apollo';
import ReactFileReader from 'react-file-reader';
import comparableStatusOptions from 'constants/comparableStatusOptions';

const Upload = ({ pipelineId, filter, client }) => {
  const [updateIformTemp] = useMutation(UPDATE_IFORM_TEMP);
  const [neighborhood, setNeighborhood] = useState({
    name: null,
    data: [],
    gqlString: '',
  });
  const [comparables, setComparables] = useState({
    name: null,
    data: [],
    gqlArray: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);

  const graphqlString = input => `
    comparable_${input.id}: saveIformGrid(
      pipelineId: "${input.pipelineId}",
      input: {
        ${input.comArray.map(item => `${item.name}: "${item.value}"`).join(',')}
      }
    )`;

  const setComparableInput = comArray => {
    let comparableInput = '';
    comArray.forEach((item, k) => {
      const compare = compares[k] ? compares[k].compare : null;
      if (compare) {
        const comObject = setGridInput(compare, item);
        comparableInput = {
          ...comparableInput,
          ...comObject,
        };
      }
    });
    return comparableInput;
  };

  const getHeader = async codes => {
    const { data } = await client.query({
      query: HEADER_CODE,
      variables: { codes },
    });
    const { headerCode = [] } = data;
    return headerCode;
  };

  const createGql = async (state, type = 'string') => {
    let str = '';
    const returnArray = [];
    const oldCols = state.data[0];
    const cols = await getHeader(oldCols);
    for (let i = 1; i <= state.data.length; i += 1) {
      const item = state.data[i];
      if (item) {
        let comArray = [];
        cols.forEach(col => {
          const index = oldCols.findIndex(oldCol => oldCol === col.code);
          const alreadyAdded = comArray.find(
            comArr => comArr.label === col.value
          );
          if (col.value && item[index] && !alreadyAdded) {
            let value = item[index];
            if (col.value === 'Status') value = comparableStatusOptions[value];
            else if (
              ['listDate', 'originalListDate', 'saleDate'].includes(
                camelCase(col.value)
              )
            ) {
              value = moment(value).format('YYYY-MM-DD');
            } else if (
              [
                'unitNumber',
                'originalListPrice',
                'listPrice',
                'salePrice',
                'squareFootage',
              ].includes(camelCase(col.value))
            ) {
              value = String(value).replace(/[^0-9]/g, '');
            }

            comArray = [
              ...comArray,
              {
                label: col.value,
                name: camelCase(col.value),
                value,
              },
            ];
          }
        });
        if (type === 'string') {
          str += graphqlString({
            comArray,
            pipelineId,
            id: i,
          });
        } else {
          const comObject = {};
          comArray.forEach(com => {
            comObject[com.name] = com.value;
          });
          returnArray.push(comObject);
        }
      }
    }
    return type === 'string' ? str : returnArray;
  };

  const handleComparableFiles = async files => {
    const reader = new FileReader();
    reader.onload = async () => {
      const csvString = reader.result;
      const csvRow = await csvtojson({
        noheader: true,
        output: 'csv',
      }).fromString(csvString);
      setComparables({
        name: files[0].name,
        data: csvRow,
        gqlArray: await createGql(
          {
            name: files[0].name,
            data: csvRow,
          },
          'array'
        ),
      });
    };
    reader.readAsText(files[0]);
  };

  const handleNeighborhoodFiles = files => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const csvString = reader.result;
      const csvRow = await csvtojson({
        noheader: true,
        output: 'csv',
      }).fromString(csvString);
      setNeighborhood({
        name: files[0].name,
        data: csvRow,
        gqlString: await createGql(
          {
            name: files[0].name,
            data: csvRow,
          },
          'string'
        ),
      });
      setLoading(false);
    };
    reader.readAsText(files[0]);
  };

  const handleShow = () => setShow(!isShow);
  const handleSubmit = async () => {
    if (!comparables.gqlArray && !neighborhood.gqlString) {
      cogoToast.warn('Need to fillup comparables or neighborhood');
    }
    if (comparables.gqlArray) {
      setLoading(true);

      try {
        await updateIformTemp({
          variables: {
            pipelineId,
            input: setComparableInput(comparables.gqlArray),
          },
          refetchQueries: [{ query: IFORM_TEMP, variables: { pipelineId } }],
        });
        cogoToast.success('Comparables created successfully');
        handleShow();
        setComparables({
          name: null,
          data: [],
          gqlArray: [],
        });
        setLoading(false);
      } catch (e) {
        cogoToast.error(setErrorMessage(e));
        setLoading(false);
      }
    }

    if (neighborhood.gqlString) {
      setLoading(true);
      try {
        await client.mutate({
          mutation: gql(`mutation { ${neighborhood.gqlString} }`),
          refetchQueries: [
            {
              query: ALL_IFORM_GRID,
              variables: { pipelineId, filter },
            },
          ],
        });
        cogoToast.success('Neighborhood created successfully');
        handleShow();
        setNeighborhood({
          name: null,
          data: [],
          gqlString: '',
        });
        setLoading(false);
      } catch (e) {
        cogoToast.error(setErrorMessage(e));
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning">
        Upload
      </Button>
      {isShow && (
        <Modal show>
          <Modal.Header>
            <Modal.Title>Upload</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group as={Form.Row}>
              <Form.Label column sm="3">
                Comparables
              </Form.Label>
              <Col sm="7">
                <Form.Control readOnly value={comparables.name || 'Required'} />
              </Col>
              <Col sm="2">
                <ReactFileReader
                  handleFiles={handleComparableFiles}
                  fileTypes=".csv"
                >
                  <Button block>Browse</Button>
                </ReactFileReader>
              </Col>
            </Form.Group>
            <Form.Group as={Form.Row}>
              <Form.Label column sm="3">
                Neighborhood
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  readOnly
                  value={neighborhood.name || 'Optional'}
                />
              </Col>
              <Col sm="2">
                <ReactFileReader
                  handleFiles={handleNeighborhoodFiles}
                  fileTypes=".csv"
                >
                  <Button block>Browse</Button>
                </ReactFileReader>
              </Col>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              disabled={isLoading}
              variant="warning"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button disabled={isLoading} onClick={handleShow}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

Upload.propTypes = {
  pipelineId: string,
  client: shape({}),
  filter: shape({}),
};

Upload.defaultProps = {
  pipelineId: null,
  client: {},
  filter: {},
};

export default withApollo(Upload);
