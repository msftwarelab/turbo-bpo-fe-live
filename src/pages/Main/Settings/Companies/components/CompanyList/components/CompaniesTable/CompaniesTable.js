import React from 'react';
import { Table } from 'react-bootstrap';
import CompanyFormList from 'components/CompanyFormList';
import { arrayOf, bool, shape } from 'prop-types';
import EditCompany from '../../../EditCompany';
import DeleteCompany from '../../../DeleteCompany';

const CompaniesTable = ({ data, loading, filter }) => {
  const renderLoading = (
    <tr>
      <td colSpan={16} className="text-center">
        loading...
      </td>
    </tr>
  );

  const renderRow = data.length ? (
    data.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.webSite}</td>
        <td>{item.isAdmin && item.isClient ? 'True' : 'False'}</td>
        <td>{item.isPremium ? 'True' : 'False'}</td>
        <td className="text-center">
          <CompanyFormList company={item} filter={filter} />{' '}
          <EditCompany company={item} filter={filter} />{' '}
          <DeleteCompany company={item} filter={filter} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={16} className="text-center">
        No data yet...
      </td>
    </tr>
  );
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Standard</th>
          <th>Premium</th>
          <th style={{ width: '10%' }} className="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>{loading ? renderLoading : renderRow}</tbody>
    </Table>
  );
};

CompaniesTable.propTypes = {
  data: arrayOf(shape({})),
  loading: bool,
  filter: shape({}),
};

CompaniesTable.defaultProps = {
  data: [],
  loading: false,
  filter: {},
};

export default CompaniesTable;
