import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { withApollo, Query } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import removeNull from 'utils/removeNull';
import removeTypeName from 'utils/removeTypeName';
import { useMe } from 'contexts/Me';
import cogoToast from 'cogo-toast';
import { shape } from 'prop-types';
import PROFILE from 'queries/profile';
import { UPDATE_PROFILE } from './mutations';
import ProfileForm from './components/ProfileForm';

const Profile = ({ client }) => {
  const { me } = useMe();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async state => {
    setLoading(true);
    const { yearOfExperience } = state;
    const input = {
      ...removeNull(state),
      yearOfExperience: String(yearOfExperience),
    };

    delete input.id;

    if (input.profilePicture) {
      const isFile = typeof input.profilePicture.name === 'string';
      if (!isFile) delete input.profilePicture;
    }

    try {
      const {
        data: { updateProfile },
      } = await client.mutate({
        mutation: UPDATE_PROFILE,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: PROFILE,
          },
        ],
      });
      setLoading(false);
      if (updateProfile) cogoToast.success('Profile updated');
      else cogoToast.error(setErrorMessage());
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <Container className="my-3" fluid>
      <Nav variant="tabs" defaultActiveKey="/profile">
        <Nav.Item>
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="border-top-0 border p-3 bg-white">
        <Row>
          <Col lg="6">
            <Query query={PROFILE}>
              {({ loading, error, data = {} }) => {
                if (loading) return <div>loading...</div>;
                if (error) cogoToast.error(setErrorMessage(error));
                return (
                  <ProfileForm
                    isLoading={isLoading}
                    initialValues={removeTypeName(data.profile)}
                    onSubmit={handleSubmit}
                    roles={me.roles}
                  />
                );
              }}
            </Query>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

Profile.defaultProps = {
  client: {},
};

Profile.propTypes = {
  client: shape({}),
};

export default withApollo(Profile);
