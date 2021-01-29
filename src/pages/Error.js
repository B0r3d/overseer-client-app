import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Seo, ErrorCard } from '../components';
import { alertActions } from '../redux';
import { errorActions } from '../redux/actions/error.actions';
import { REQUEST } from '../request.constants';
import { RoutingConfig } from '../Routes';
import { ProjectApi } from '../services';
import { STATUS_CODES } from '../status.constants';

const Error = ({ errors, match }) => {
  const projectId = match.params.id;
  const errorId = match.params.error_id;
  const [status,setStatus] = useState(REQUEST.PENDING);
  const dispatch = useDispatch();
  const history = useHistory();
  const error = errors.currentError;

  useEffect(() => {
    if(!error || error.id !== errorId) {
      ProjectApi.getError(projectId, errorId)
      .then(response => response.data)
      .then(json => {
        dispatch(errorActions.receiveError(json.payload));
        setStatus(REQUEST.SUCCESS);
      })
      .catch(error => {
        const statusCode = error.request.status;
        switch(statusCode) {
          case STATUS_CODES.FORBIDDEN:
            history.push(RoutingConfig.account);
            dispatch(alertActions.errorAlert("You are not allowed to view this error"));
            break;
          default:
            setStatus(REQUEST.ERROR);
        }
      })
    }
    else {
      setStatus(REQUEST.SUCCESS);
    }
  }, []);

  return(
    <>
      {<Seo pageTitle="Error" />}
      {status === REQUEST.PENDING && <h2>Loading...</h2>}
      {status === REQUEST.ERROR && <h2>Failed to load project.</h2>}
      {status === REQUEST.SUCCESS && error && <ErrorCard error={error} projectId={projectId} /> }
    </>
  )
}

const mapStateToProps = state => ({
  errors: state.errors,
})

const ConnectedPage = connect(mapStateToProps)(Error);

export { ConnectedPage as Error };