import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import RESET_PASSWORD from 'mutations/resetPassword';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import ResetPasswordForm from './components/ResetPasswordForm';
import { StyledFormContainer } from './styles';

const ResetPassword = ({ match }) => {
  const { token } = match.params;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (fields, { resetForm }) => {
    const { password } = fields;
    setLoading(true);
    try {
      await resetPassword({
        variables: {
          token,
          newPassword: password,
        },
      });

      setLoading(false);
      setSuccess(true);
      resetForm();
      cogoToast.success('Password successfully reset');
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      cogoToast.error(setErrorMessage(err));
    }
  };

  if (isSuccess) return <Redirect to="/login" />;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <StyledFormContainer>
            <Card>
              <Card.Body>
                <ResetPasswordForm
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

export default ResetPassword;
