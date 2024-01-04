import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import { withApollo } from 'react-apollo';
import moment from 'moment';
import setErrorMessage from 'utils/setErrorMessage';
import { shape } from 'prop-types';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRightClickDisabled } from 'contexts/RightClickDisabled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ALL_PIPELINE from 'queries/allPipeline';
import { PROCESS_PIPELINE } from './mutations';

const ProcessPipelineModal = ({ client, pipeline, pipelineFilter }) => {
  let total = 0;
  total = pipeline.isProcessIform ? total + 1 : total;
  total = pipeline.isProcessIfill ? total + 1 : total;
  total = pipeline.isProcessReview ? total + 1 : total;
  const [isShow, setShow] = useState(false);
  const [totalProcess, setTotalProcess] = useState(total);
  const [isLoading, setLoading] = useState(false);
  const [process, setProcess] = useState({
    isProcessIform: pipeline.isProcessIform || false,
    isProcessIfill: pipeline.isProcessIfill || false,
    isProcessReview: pipeline.isProcessReview || false,
  });
  const [processPipeline] = useMutation(PROCESS_PIPELINE);
  const { setRightClickDisabled } = useRightClickDisabled();
  const handleShow = () => {
    setShow(!isShow);
    setRightClickDisabled(!isShow);
  }
  const handleProcess = e => {
    setProcess({
      ...process,
      [e]: !process[e],
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await processPipeline({
        variables: {
          id: pipeline.id,
          input: {
            ...process,
          },
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter: pipelineFilter },
          },
        ],
      });
      setLoading(false);
      handleShow();
      total = 0;
      total = process.isProcessIform ? total + 1 : total;
      total = process.isProcessIfill ? total + 1 : total;
      total = process.isProcessReview ? total + 1 : total;
      setTotalProcess(total);
      cogoToast.success('Complete');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <div>
        <a href="#/" onClick={handleShow}>
          <FontAwesomeIcon icon={faCheck} />
        </a>{' '}
        {totalProcess > 0 ? totalProcess : null}
      </div>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Process</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <Button
                variant="warning"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
            <Table bordered striped hover size="sm">
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="iForm"
                        checked={process.isProcessIform}
                        onChange={() => handleProcess('isProcessIform')}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    {pipeline.processIformModifiedDate
                      ? moment(pipeline.processIformModifiedDate).format(
                        'MMM DD YYYY, hh:mm A'
                      )
                      : ''}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="iFill"
                        checked={process.isProcessIfill}
                        onChange={() => handleProcess('isProcessIfill')}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    {pipeline.ifillProcessModifiedDate
                      ? moment(pipeline.ifillProcessModifiedDate).format(
                        'MMM DD YYYY, hh:mm A'
                      )
                      : ''}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

ProcessPipelineModal.propTypes = {
  client: shape({}),
  pipeline: shape({}),
  pipelineFilter: shape({}),
};

ProcessPipelineModal.defaultProps = {
  client: {},
  pipeline: {},
  pipelineFilter: {},
};

export default withApollo(ProcessPipelineModal);
