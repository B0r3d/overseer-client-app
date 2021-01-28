import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RoutingConfig } from '../Routes'

const OnlyLoggedInRoute = ({ auth, path, component }) => {
  
  if(auth.isAuthenticated) {
    return(
      <Route exact path={path} component={component} />
    )
  }

  return(
    <Redirect to={RoutingConfig.login} />
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const ConnectedOnlyLoggedInRoute = connect(mapStateToProps)(OnlyLoggedInRoute);

export { ConnectedOnlyLoggedInRoute as OnlyLoggedInRoute };