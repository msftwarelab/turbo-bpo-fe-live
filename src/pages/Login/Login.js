import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Container, Row, Col, Card } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { StyledFormContainer } from './styles';
import LoginForm from './components/LoginForm';
import { LOGIN } from './mutations';

const Login = ({ client, history }) => {
  const [isLoading, setLoading] = useState(false);
  const credentials = {
    email: '',
    password: '',
  };

  const handleSubmit = async variables => {
    setLoading(true);
    try {
      const {
        data: {
          login: { token },
        },
      } = await client.mutate({
        mutation: LOGIN,
        variables,
      });
      setLoading(false);
      localStorage.setItem('accessToken', token);
      history.push('/');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <StyledFormContainer>
            <Card>
              <Card.Body>
                <h5 className="text-center mb-4">Login to your account</h5>
                <LoginForm
                  isLoading={isLoading}
                  initialValues={credentials}
                  onSubmit={handleSubmit}
                />
                <div className="text-center mt-3">
                  <Link to="/register">Register for an account</Link> |{' '}
                  <Link to="/forgot-password">Can't login?</Link>
                </div>
              </Card.Body>
            </Card>
          </StyledFormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default withApollo(withRouter(Login));
