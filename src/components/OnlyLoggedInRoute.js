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

  const setCookie = (cname, cvalue, minutes) => {
    var d = new Date();
    d.setTime(d.getTime() + (minutes*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  setCookie("login_redirect_path", path, 5);
  return(
    <Redirect to={RoutingConfig.login} />
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const ConnectedOnlyLoggedInRoute = connect(mapStateToProps)(OnlyLoggedInRoute);

export { ConnectedOnlyLoggedInRoute as OnlyLoggedInRoute };