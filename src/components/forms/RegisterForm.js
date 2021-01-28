import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { UserApi } from '../../services';

export const RegisterForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    UserApi.registerUser(data)
    .then(response => response.data)
    .then(json => {
      if(json.ok) {
        history.push(RoutingConfig.login);
        dispatch(alertActions.successAlert("Your account has been registered, you may log in now."));
      }
    })
    .catch(error => {
      dispatch(alertActions.errorAlert("We encountered a problem, pleas try again later."))
    })
  }

  const validateRepeatedPassword = value => value === watch("password") || "Passwords must match.";
  async function validateAvailableUsername(value) {
    const exists = await UserApi.userExists(value, '').then(response => response.status).then(status => status === 200).catch(error => false);
    return !exists || "User with given username already exists.";
  }
  async function validateAvailableEmail(value) {
    const exists = await UserApi.userExists('', value).then(response => response.status).then(status => status === 200).catch(error => false);
    return !exists || "User with given email already exists.";
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-2">Register new user</h2>
      <FormGroup>
        <Label for="register_username">Username</Label>
        <Input type="text" name="username" id="register_username" innerRef={register({validate: validateAvailableUsername})} required />
        {errors.username && <div className="text-danger">{errors.username.message}</div> }
      </FormGroup>
      <FormGroup>
        <Label for="register_email">Email</Label>
        <Input type="email" name="email" id="register_email" innerRef={register({validate: validateAvailableEmail})} required />
        {errors.email && <div className="text-danger">{errors.email.message}</div> }
      </FormGroup>
      <FormGroup>
        <Label for="register_password">Pasword</Label>
        <Input type="password" name="password" id="register_password" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="register_password_repeated">Repeat password</Label>
        <Input type="password" name="password_repeated" id="register_password_repeated" innerRef={register({validate: validateRepeatedPassword})} required />
        {errors.password_repeated && <div className="text-danger">{errors.password_repeated.message}</div> }
      </FormGroup>
      <Button>Register</Button>
      <div className="links pt-2">
        <Link to={RoutingConfig.login}>Already have an account?</Link>
      </div>
    </Form>
  )
}