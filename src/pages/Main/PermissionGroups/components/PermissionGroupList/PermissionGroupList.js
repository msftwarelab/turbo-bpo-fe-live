import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMe} from 'contexts/Me'
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import cogoToast from 'cogo-toast';
import { Table } from 'react-bootstrap';
import ALL_PERMISSION_GROUP from 'queries/allPermissionGroup';
import EditPermissionGroup from '../EditPermissionGroup';
import DeletePermissionGroup from '../DeletePermissionGroup';

const PermissionGroupList = ({ filter = {}, onChangeFilter = e => e }) => {
  const { loading, error, data = {} } = useQuery(ALL_PERMISSION_GROUP, {
    variables: { filter },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const { allPermissionGroup = {} } = data;
  const { totalCount = 0, results = [] } = allPermissionGroup;
  const pageCount = Math.ceil(totalCount / filter.limit);
  const { me } = useMe()
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Namdddde</th>
            <th>Permissions</th>
            { (me.permissionList.includes('UPDATE_PERMISSION') || me.permissionList.includes('DELETE_PERMISSION')) && (
               <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center">
                loading...
              </td>
            </tr>
          ) : results.length ? (
            results.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.permissions.length}</td>
                {( me.permissionList.includes('UPDATE_PERMISSION')  ||  me.permissionList.includes('DELETE_PERMISSION')) && (
                   <td>
                    { me.permissionList.includes('UPDATE_PERMISSION') && (
                        <EditPermissionGroup permissionGroup={item} filter={filter} />
                    )} {' '}
                      { me.permissionList.includes('DELETE_PERMISSION') && (
                        <DeletePermissionGroup
                          permissionGroup={item}
                          filter={filter}
                          />
                    )}
                 </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data yet...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={onChangeFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

export default PermissionGroupList;
