import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Pagination from 'components/Pagination';
import cogoToast from 'cogo-toast';
import { useMe } from 'contexts/Me';
import { Button } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import ALL_QUALITY_CONTROL from 'queries/allQualityControl';
import QualityControlTable from './components/QualityControlTable';
import QualityControlDetail from './components/QualityControlDetail';
import QualityControlRequest from './components/QualityControlRequest';
import QualityControlHistory from './components/QualityControlHistory';
import { StyledContainer } from './styles';

const QualityControlList = () => {
  const { me } = useMe();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 20,
  });
  const [isShowDetail, setShowDetail] = useState(false);
  const [qualityControl, setQualityControl] = useState({});
  const { loading, error, data = {}, refetch } = useQuery(ALL_QUALITY_CONTROL, {
    variables: { filter },
    fetchPolicy: 'network-only',
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleRefresh = () => {
    refetch();
  };
  const handleFilter = async e => {
    const newFilter = {
      ...filter,
      offset: e.selected * filter.limit,
    };
    setFilter(newFilter);
  };
  const handleShowDetail = selected => {
    setQualityControl(selected);
    setShowDetail(!isShowDetail);
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  };
  const { allQualityControl = {} } = data;
  const { totalCount = 0, results = [] } = allQualityControl;
  const pageCount = Math.ceil(totalCount / filter.limit);
  return (
    <StyledContainer>
      <div>
        <QualityControlTable
          loading={loading}
          data={results}
          qualityControlFilter={filter}
          onShowDetail={handleShowDetail}
        />
        <div className="d-flex">
          <div className="mr-auto">
            <Button className="mr-2" onClick={handleRefresh} disabled={loading}>
              Refresh
            </Button>
            {me.permissionList.includes('VIEW_QUALITY_CONTROL_HISTORY') && (
              <QualityControlHistory />
            )}
            {me.permissionList.includes('VIEW_QUALITY_CONTROL_REQUEST') && (
              <QualityControlRequest />
            )}
          </div>
          {results && results.length ? (
            <Pagination
              pageCount={pageCount}
              onPageChange={handleFilter}
              currentPage={filter.offset / filter.limit}
            />
          ) : null}
        </div>
      </div>
      {isShowDetail && (
        <QualityControlDetail
          qualityControl={qualityControl}
          qualityControlFilter={filter}
          onClose={handleCloseDetail}
        />
      )}
    </StyledContainer>
  );
};

export default QualityControlList;
