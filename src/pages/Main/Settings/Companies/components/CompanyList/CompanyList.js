import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import ALL_COMPANY from 'queries/allCompany';
import { shape, func } from 'prop-types';
import CompaniesTable from './components/CompaniesTable';

const CompanyList = ({ filter, onChangeFilter }) => {
  const { loading, error, data = {} } = useQuery(ALL_COMPANY, {
    variables: {
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = async e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };

  const { allCompany = {} } = data;
  const { totalCount = 0, results = [] } = allCompany;
  const pageCount = Math.ceil(totalCount / filter.limit);

  return (
    <>
      <CompaniesTable loading={loading} data={results} filter={filter} />
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

CompanyList.propTypes = {
  onChangeFilter: func,
  filter: shape({}),
};

CompanyList.defaultProps = {
  onChangeFilter: e => e,
  filter: {},
};

export default CompanyList;
