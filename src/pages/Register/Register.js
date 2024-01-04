import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { StyledFormContainer } from './styles';
import RegisterForm from './components/RegisterForm';
import { REGISTER } from './mutations';
import { LOGIN } from '../Login/mutations';

const Register = ({ client, history }) => {
  const [isLoading, setLoading] = useState(false);
  const credentials = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    hdyfu: '',
    phoneConsultation: false,
    isCollapseOpen: false,
  };

  const handleSubmit = async e => {
    setLoading(true);
    const input = e;
    delete input.isCollapseOpen;
    delete input.recaptcha;
    try {
      const {
        data: { registerUser },
      } = await client.mutate({
        mutation: REGISTER,
        variables: {
          input,
        },
      });
      if (registerUser) {
        const {
          data: {
            login: { token },
          },
        } = await client.mutate({
          mutation: LOGIN,
          variables: {
            email: input.email,
            password: input.password,
          },
        });
        localStorage.setItem('accessToken', token);
        history.push('/');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <StyledFormContainer>
            <Card>
              <Card.Body>
                <h5 className="text-center mb-4">Register for your account</h5>
                <RegisterForm
                  isLoading={isLoading}
                  initialValues={credentials}
                  onSubmit={handleSubmit}
                />
                <div className="text-center mt-3">
                  <Link to="/login">Already have an account? Log in</Link>
                </div>
              </Card.Body>
            </Card>
          </StyledFormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default withApollo(Register);
