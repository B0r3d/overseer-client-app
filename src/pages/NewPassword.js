import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import { NewPasswordForm, Seo } from '../components';
import { UserApi } from '../services';

export const NewPassword = props => {
  const queryParams = new URLSearchParams(props.location.search);
  const passwordResetToken = queryParams.get("password-reset-token");
  const [validToken, setValidToken] = useState();

  useEffect(() => {
    UserApi.checkPasswordResetToken(passwordResetToken)
    .then(response => {
      setValidToken(true);
    })
    .catch(error => {
      setValidToken(false);
    });
  }, []);

  if(validToken === false) {
    return(
      <Row className="pt-5">
        <Seo pageTitle="New password" />
        <Col className="text-center"><h2>Token is invalid or expired.</h2></Col>
      </Row>
    )
  }

  if(validToken === true) {
    return <>
      <Seo pageTitle="New password" />
      <NewPasswordForm passwordResetTokenId={passwordResetToken} />
    </>
  }

  return null;
}