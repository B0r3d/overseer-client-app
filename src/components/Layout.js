import { Alert } from './Alert';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import { Header } from './Header';
import { useHistory } from 'react-router-dom';
import { alertActions } from '../redux';

const Layout = ({ children, alert }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  history.listen(() => {
    dispatch(alertActions.clearAlerts());
  })

  return(
    <div>
      <Header />
      <Container className="pt-2">
        { alert.hasOwnProperty("message") && <Alert alert={alert} /> }
        {children}
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert
  }
};

const ConnectedLayout = connect(mapStateToProps)(Layout);
export { ConnectedLayout as Layout }