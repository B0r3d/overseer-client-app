import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';
import { alertActions, authActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { UserApi } from '../../services';
import { STATUS_CODES } from '../../status.constants';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    setErrorMessage("");
    UserApi.authenticate(data)
    .then(response => response.data)
    .then(json => {
      dispatch(authActions.authenticate(json.payload.access_token));
      history.push(RoutingConfig.account);
      dispatch(alertActions.successAlert("Login success"));
    })
    .catch(error => {
      const statusCode = error.request.status;
      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          setErrorMessage("Invalid credentials.")
          break;
        default:
          setErrorMessage("There was an error, pleas try again later");
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-4">Log in to your account</h2>
      <FormGroup>
        <Label for="login_login">Username</Label>
        <Input type="text" name="login" id="login_login" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="login_password">Pasword</Label>
        <Input type="password" name="password" id="login_password" innerRef={register} required />
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </FormGroup>
      <Button>Login</Button>
      <Row className="pt-2">
        <Col className="text-center" md="6" lg="6">
          <Link to={RoutingConfig.requestNewPassword}>Forgot password?</Link><br />
        </Col>
        <Col className="text-center" md="6" lg="6">
          <Link to={RoutingConfig.register}>Don't have an account?</Link>
        </Col>
      </Row>
    </Form>
  );
}