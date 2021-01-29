import { Alert } from './Alert';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Header } from './Header';
import { useHistory } from 'react-router-dom';
import { alertActions } from '../redux';
const Layout = ({ children, alert, modal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  history.listen(() => {
    dispatch(alertActions.clearAlerts());
  })

  return(
    <div>
      <Header />

      <Modal isOpen={modal.shown}>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalBody>
          {modal.description}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={modal.onConfirm}>Confirm</Button>{' '}
          <Button color="secondary" onClick={modal.onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Container className="pt-2">
        { alert.hasOwnProperty("message") && <Alert alert={alert} /> }
        {children}
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    modal: state.modal,
  }
};

const ConnectedLayout = connect(mapStateToProps)(Layout);
export { ConnectedLayout as Layout }