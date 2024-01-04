import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import setCurrency from 'utils/setCurrency';
import IFormHistory from 'components/IFormHistory';
import { string, shape } from 'prop-types';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import IFormGeneral from 'components/IFormGeneral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faMapMarker,
  faDollarSign,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import UPDATE_IFORM_TEMP from 'mutations/updateIformTemp';
import setErrorMessage from 'utils/setErrorMessage';
import setGridInput from 'utils/setGridInput';
import compares from 'constants/compInputOptions';
import cogoToast from 'cogo-toast';
import IFORM_TEMP from 'queries/iformTemp';
import { StyledImage, StyledHeader } from './styles';
import Upload from './components/Upload';
import GridList from './components/GridList';
import DropColumn from './components/DropColumn';

const Grid = ({ pipelineId, iform }) => {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
    search: null,
  });
  const handleFilter = async e => setFilter(e);
  const [updateIformTemp] = useMutation(UPDATE_IFORM_TEMP);
  const [isShow, setShow] = useState(true);
  const handleShow = () => setShow(!isShow);
  const handleGridDrop = async e => {
    try {
      await updateIformTemp({
        variables: {
          pipelineId,
          input: setGridInput(e.compare, e.iformGrid),
        },
        refetchQueries: [{ query: IFORM_TEMP, variables: { pipelineId } }],
      });
      cogoToast.success('Complete');
    } catch (err) {
      cogoToast.error(setErrorMessage(err));
    }
  };
  return (
    <DndProvider backend={Backend}>
      <div className="border-top-0 border p-3 bg-white">
        <div className="d-flex mb-4">
          <div className="mr-2">
            <Upload pipelineId={pipelineId} filter={filter} />
          </div>
          <div className="mr-auto">
            <Button onClick={handleShow}>Thumbnails</Button>
          </div>
          <div className="mr-2">
            <IFormHistory history={iform.history} />
          </div>
          <IFormGeneral pipelineId={pipelineId} iform={iform} />
        </div>
        {isShow && (
          <Form className="mb-5">
            <Form.Row>
              {compares.map((item, key) => (
                <DropColumn compareName={item.compare} sm="2" key={key}>
                  <h6>{item.compare}</h6>
                  <StyledImage className="mb-2">
                    <StyledHeader className="d-flex">
                      <div className="mr-auto text-light">
                        <h6 className="m-0">
                          {iform[`txt${item.compare}Address`]}
                        </h6>
                        <div>
                          <small>
                            {iform[`txt${item.compare}City`] || '-'}{' '}
                            {iform[`txt${item.compare}Zip`] || '-'}
                          </small>
                        </div>
                      </div>
                      <h4
                        className={`m-0 ${
                          item.status === 'Sold'
                            ? 'text-danger'
                            : 'text-success'
                        }`}
                      >
                        {item.status}
                      </h4>
                    </StyledHeader>
                    <FontAwesomeIcon
                      icon={faImage}
                      size="3x"
                      className="text-secondary"
                    />
                  </StyledImage>
                  <div>
                    <FontAwesomeIcon icon={faMapMarker} /> -{' '}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faDollarSign} />{' '}
                    {setCurrency(
                      '',
                      iform[`txt${item.compare}ListPrice`] || 0,
                      2
                    )}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faHome} />{' '}
                    {iform[`txt${item.compare}Bedrooms`] || 0} Beds,{' '}
                    {iform[`txt${item.compare}FullBaths`] || 0} Baths
                  </div>
                </DropColumn>
              ))}
            </Form.Row>
          </Form>
        )}
        <GridList
          iform={iform}
          pipelineId={pipelineId}
          filter={filter}
          onGridDrop={handleGridDrop}
          onChangeFilter={handleFilter}
        />
      </div>
    </DndProvider>
  );
};

Grid.propTypes = {
  pipelineId: string,
  iform: shape({}),
};

Grid.defaultProps = {
  pipelineId: null,
  iform: {},
};
export default Grid;
