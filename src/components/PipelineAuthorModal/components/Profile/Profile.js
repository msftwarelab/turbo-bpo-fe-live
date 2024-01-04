import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col, Form, Card } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import { string } from 'prop-types';
import USER from 'queries/user';
import USER_PROFILE_DOC from 'queries/userProfileDoc';
import USER_COMMENT from 'queries/userComment';
import PhotoImage from 'components/PhotoImage';

const Profile = ({ userId }) => {
  const { loading, error, data = {} } = useQuery(USER, {
    variables: { id: userId },
  });

  const { loading: loadingDoc, error: errorDoc, data: dataDoc = {} } = useQuery(
    USER_PROFILE_DOC,
    {
      variables: { userId },
    }
  );

  const {
    loading: loadingComment,
    error: errorComment,
    data: dataComment = {},
  } = useQuery(USER_COMMENT, {
    variables: { userId },
  });

  const { user = {} } = data;
  const { results = {} } = dataDoc;
  const { documents = [] } = results;
  const { allComment = {} } = dataComment;

  const errorAll = error || errorDoc || errorComment || null;

  if (errorAll) return <div>{setErrorMessage(errorAll)}</div>;
  if (loading || loadingDoc || loadingComment) return <div>loading...</div>;

  let profilePic = '/assets/images/no-profile-pic.jpg';
  if (user.profilePicture != null) profilePic = user.profilePicture;

  let signPic = '/assets/images/no-signature.jpg';
  if (user.profilePicture != null) {
    const sign = documents.find(signature => signature.type === 'signature');
    if (sign && sign.url) {
      signPic = sign.url;
    }
  }

  return (
    <div className="border-top-0 border p-3 bg-white">
      <Row>
        <Col xs="9">
          <Row className="p-1 mb-2">
            <Col xs="4">First Name: </Col>
            <Col xs="4">{user.firstName}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Last Name: </Col>
            <Col xs="4">{user.lastName}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Email address: </Col>
            <Col xs="4">{user.email}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Company: </Col>
            <Col xs="4">{user.company}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Phone number: </Col>
            <Col xs="4">{user.phoneNumber}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Address: </Col>
            <Col xs="4">{user.address}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">City: </Col>
            <Col xs="4">{user.city}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">State: </Col>
            <Col xs="4">{user.state}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Zip: </Col>
            <Col xs="4">{user.zipCode}</Col>
          </Row>
          <div className="mb-2">
            <Form.Check
              type="checkbox"
              checked={user.imABroker}
              id="brocker"
              label="I'm a Broker"
            />
          </div>
          <Row className="p-1 mb-2">
            <Col xs="4">Zip: </Col>
            <Col xs="4">{user.zipCode}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Broker: </Col>
            <Col xs="4">{user.broker}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Broker License: </Col>
            <Col xs="4">{user.brokerLicense}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Agent: </Col>
            <Col xs="4">{user.agent}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Agent License: </Col>
            <Col xs="4">{user.agentLicense}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">License Date: </Col>
            <Col xs="4">{user.licenseDate}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">License Expiration Date: </Col>
            <Col xs="4">{user.licenseExpirationDate}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Brokerage: </Col>
            <Col xs="4">{user.brokerage}</Col>
          </Row>
          <Row className="p-1 mb-2">
            <Col xs="4">Year Of Experience: </Col>
            <Col xs="4">
              {user.yearOfExperience === 'undefined'
                ? ''
                : user.yearOfExperience}
            </Col>
          </Row>
        </Col>
        <Col xs="3" className="pr-5">
          <Row className="p-1 mb-2">
            <div>Profile Picture: </div>
            <PhotoImage url={profilePic} />
          </Row>
          <Row className="p-1 mb-2">
            <div>Signature: </div>
            <PhotoImage url={signPic} />
          </Row>
          <Row className="p-1 mb-1">
            <div>Disclaimer: </div>
          </Row>
          <Row className="p-1 mb-2">
            {allComment.map(comment =>
              comment.category === 'Others' ? (
                <Card className="mb-2 pt-1 px-2">{comment.value}</Card>
              ) : null
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Profile.propTypes = {
  userId: string,
};

Profile.defaultProps = {
  userId: null,
};

export default Profile;
