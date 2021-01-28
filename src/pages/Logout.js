import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { alertActions, authActions } from '../redux';
import { RoutingConfig } from '../Routes';

export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(authActions.logout());
    history.push(RoutingConfig.login);
    dispatch(alertActions.successAlert("You have been logged out"));
  }, []);
  
  return null;
}