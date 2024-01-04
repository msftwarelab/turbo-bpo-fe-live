import React from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import ALL_USER_EMAIL from 'queries/allUserEmail';

const UserFilter = ({ onSelect }) => {
  const { loading, error, data = {} } = useQuery(ALL_USER_EMAIL, {
    variables: {
      filter: { limit: 1000, offset: 0 },
    },
  });
  const { allUser = {} } = data;
  const { results = [] } = allUser;

  const selectEmailHandler = event => {
    const selectedEmail = event.target.value;
    if (selectedEmail === 'Select User') return;

    const user = results.find(user => user.email === selectedEmail);
    onSelect(user.id);
  };

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>Failed to fetch data</div>;
  }

  return (
    <div className="d-flex align-items-center">
      <div className="mr-2">User: </div>
      {!loading && !error ? (
        <Form.Control
          className="col-2"
          size="sm"
          as="select"
          onChange={selectEmailHandler}
        >
          <option>Select User</option>
          {results.map(user => (
            <option>{user.email}</option>
          ))}
        </Form.Control>
      ) : (
        content
      )}
    </div>
  );
};

export default UserFilter;
