import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FORGOT_PASSWORD from 'mutations/forgotPassword';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { StyledFormContainer } from './styles';

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const handleSubmit = async (fields, { resetForm }) => {
    const { email } = fields;
    setLoading(true);
    try {
      forgotPassword({
        variables: {
          email,
        },
      });
      setLoading(false);
      setSuccess(true);
      resetForm();
    } catch (err) {
      setLoading(false);
      setSuccess(true);
      cogoToast.error(setErrorMessage(err));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <StyledFormContainer>
            <Card>
              <Card.Body>
                <ForgotPasswordForm
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  handleSubmit={handleSubmit}
                />
              </Card.Body>
            </Card>
          </StyledFormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
