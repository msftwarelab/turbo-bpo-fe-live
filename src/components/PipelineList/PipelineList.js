import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import Pagination from 'components/Pagination';
import { Button, Row, Col } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_PIPELINE from 'queries/allPipeline';
import BatchStatus from 'components/BatchStatus';
import { useMe } from 'contexts/Me';
import BatchAssignPipeline from 'components/BatchAssignPipeline';
import BatchDownloadPhotos from 'components/BatchDownloadPhotos';
import ExportOrders from 'components/ExportOrders';
import { shape, func } from 'prop-types';
import PIPELINE_STATE from 'queries/pipelineState';
import RightClickDisabledProvider from 'contexts/RightClickDisabled';
import { useModalStatus } from 'contexts/ModalStatus';
import Search from './components/Search';
import PipelinesTable from './components/PipelinesTable';
import QuickFilter from './components/QuickFilter';

const PipelineList = ({
  client,
  filter,
  exportData,
  onCreate,
  onEdit,
  onChangeFilter,
}) => {
  const { me } = useMe();
  const { isModalOpen } = useModalStatus();
  const [pipelineStateLoading, setPipelineStateLoading] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState([]);
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE, {
    variables: { filter },
    fetchPolicy: 'no-cache',
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    const newFilter = {
      ...filter,
      offset: e.selected * filter.limit,
    };
    onChangeFilter(newFilter);
  };
  const handleSearch = e => {
    onChangeFilter(e);
  };
  const handleSelectedPipeline = e => {
    let newSelectedPipeline = [...selectedPipeline, e];
    if (selectedPipeline.map(item => item.id).includes(e.id)) {
      newSelectedPipeline = selectedPipeline.filter(item => item.id !== e.id);
    }
    setSelectedPipeline(newSelectedPipeline);
  };

  const handleCheckPipelineState = async () => {
    try {
      setPipelineStateLoading(true);
      const { data: stateData } = await client.query({
        query: PIPELINE_STATE,
      });
      const { todayOrderCount = 0, maxDailyVolume } = stateData.pipelineState;
      if (todayOrderCount >= maxDailyVolume) {
        cogoToast.error('Max daily volume exceeded');
        return;
      }
      setPipelineStateLoading(false);
      onCreate();
    } catch (e) {
      setPipelineStateLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  const handleReset = () => {
    onChangeFilter({
      offset: 0,
      limit: 20,
    });
  };
  const { allPipeline = {} } = data;
  const { totalCount = 0, results = [] } = allPipeline;
  const pageCount = Math.ceil(totalCount / filter.limit);

  console.log(results);

  const handleAllSelectedPipeline = () => {
    let newSelectedPipeline = results;
    if (
      results.some(item =>
        selectedPipeline.map(selected => selected.id).includes(item.id)
      )
    )
      newSelectedPipeline = [];
    setSelectedPipeline(newSelectedPipeline);
  };
  return (
    <>
      <div className="mb-3 d-flex">
        <div className="mr-2">
          <QuickFilter filter={filter} onSearch={handleSearch} />
        </div>
        {me.permissionList.includes('CREATE_PIPELINE') && (
          <Button
            onClick={handleCheckPipelineState}
            variant="warning"
            className="mr-2"
            disabled={pipelineStateLoading}
          >
            New Order
          </Button>
        )}
        {me.permissionList.includes('SEARCH_PIPELINE') && (
          <div className="mr-2">
            <Search
              filter={filter}
              onSearch={handleSearch}
              onReset={handleSearch}
            />
          </div>
        )}

        <Button onClick={handleReset} disabled={loading}>
          Reset
        </Button>
      </div>
      <RightClickDisabledProvider initRightClickDisabled={false}>
        <PipelinesTable
          selectedPipeline={selectedPipeline}
          onSelectPipeline={handleSelectedPipeline}
          onAllSelectedPipeline={handleAllSelectedPipeline}
          loading={loading}
          data={results}
          onEdit={onEdit}
          pipelineFilter={filter}
          roles={me.roles}
        />
      </RightClickDisabledProvider>

      <Row>
        <Col>
          <div className="d-flex">
            {me.permissionList.includes(
              'CAN_MAKE_PIPELINE_BATCH_ASSIGNMENT'
            ) && (
              <div className="mr-2">
                <BatchAssignPipeline
                  selectedPipeline={selectedPipeline}
                  pipelineFilter={filter}
                />
              </div>
            )}
            {me.permissionList.includes('CAN_MAKE_PIPELINE_BATCH_STATUS') && (
              <div className="mr-2">
                <BatchStatus
                  selectedPipeline={selectedPipeline}
                  pipelineFilter={filter}
                />
              </div>
            )}
            {me.permissionList.includes('CAN_MAKE_PIPELINE_EXPORT_ORDERS') && (
              <>
                <div className="mr-2">
                  <ExportOrders
                    title="Export All Orders"
                    data={exportData}
                    fileName={`Page_1_to_${pageCount}_${totalCount}_Orders`}
                  />
                </div>
                <div className="mr-2">
                  <ExportOrders
                    title="Export Orders Displayed"
                    data={results}
                    fileName={`Page_${pageCount}_to_${totalCount}`}
                  />
                </div>
              </>
            )}
            {me.permissionList.includes('CAN_MAKE_PIPELINE_EXPORT_PHOTO') && (
              <div className="mr-2">
                <BatchDownloadPhotos selectedPipeline={selectedPipeline} />
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            <div className="my-2 mr-3">
              displaying {filter.offset + 1}-
              {totalCount >= filter.offset + filter.limit
                ? filter.offset + filter.limit
                : totalCount}{' '}
              of {totalCount}
            </div>
            <div>
              {results && results.length ? (
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handleFilter}
                  currentPage={filter.offset / filter.limit}
                />
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

PipelineList.propTypes = {
  filter: shape({}),
  onCreate: func,
  onEdit: func,
  onChangeFilter: func,
  client: shape({}),
};

PipelineList.defaultProps = {
  filter: {},
  onCreate: e => e,
  onEdit: e => e,
  client: {},
  onChangeFilter: e => e,
};

export default withApollo(PipelineList);
