import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions } from '../../redux';
import { UserApi } from '../../services';
import { STATUS_CODES } from '../../status.constants';

export const RequestNewPasswordForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = data => {
    errorMessage && setErrorMessage("");
    UserApi.requestPasswordReset(data)
    .then(response => {
      dispatch(alertActions.successAlert("Password reset link has been set to the email used by the account. It will be active for 2 hours."));
    })
    .catch(error => {
      if(error.request.status === STATUS_CODES.BAD_REQUEST) {
        setErrorMessage("User with given login does not exist.");
      }
    })
  }

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-4">Request password reset</h2>
      <FormGroup>
        <Label for="request_password_reset_login">Login</Label>
        <Input type="text" name="login" id="request_password_reset_login" innerRef={register} required />
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </FormGroup>
      <Button>Send</Button>
    </Form>
  )
}