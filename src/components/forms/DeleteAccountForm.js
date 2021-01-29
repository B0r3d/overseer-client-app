import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { alertActions, authActions } from '../../redux';
import { RoutingConfig } from '../../Routes';
import { UserApi } from '../../services';
import { STATUS_CODES } from '../../status.constants';

const DeleteAccountForm = ({ auth }) => {
  const {register, handleSubmit, watch, errors} = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    errorMessage && setErrorMessage("");
    UserApi.deleteUser(auth.user.id, data)
    .then(response => {
      dispatch(authActions.logout());
      history.push(RoutingConfig.home);
      dispatch(alertActions.successAlert("Account has been deleted."));
    })
    .catch(error => {
      const statusCode = error.request.status;
      
      switch(statusCode) {
        case STATUS_CODES.BAD_REQUEST:
          setErrorMessage("Invalid password.");
          break;
        case STATUS_CODES.FORBIDDEN:
          setErrorMessage("Unauthorized request.");
          break;
        default:
          setErrorMessage("An error has occurred, try again later.");
      }
    })
  }

  const validateRepeatedPassword = value => watch("password") === value || "Passwords must match.";

  return(
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-2">
      <h2 className="mb-4">Delete account</h2>
      <FormGroup>
        <Label for="delete_account_password">Pasword</Label>
        <Input type="password" name="password" id="delete_account_password" innerRef={register} required />
      </FormGroup>
      <FormGroup>
        <Label for="delete_account_password_repeated">Repeat password</Label>
        <Input type="password" name="password_repeated" id="delete_account_password_repeated" innerRef={register({validate: validateRepeatedPassword})} required />
        {errors.password_repeated && <div className="text-danger">{errors.password_repeated.message}</div> }
        {errorMessage && <div className="text-danger">{errorMessage}</div> }
      </FormGroup>
      <Button>Send</Button>
    </Form>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

const ConnectedDeleteAccountForm = connect(mapStateToProps)(DeleteAccountForm);

export { ConnectedDeleteAccountForm as DeleteAccountForm };