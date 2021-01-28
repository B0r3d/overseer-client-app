import React from 'react'
import {Switch, Route} from "react-router-dom";
import { OnlyLoggedInRoute } from './components';
import { Account, Home, Login, Register, Logout, ChangePassword, RequestNewPassword, NewPassword } from './pages';

export const RoutingConfig = {
    home: "/",
    register: "/register",
    login: "/login",
    account: "/account",
    logout: "/logout",
    changePassword: "/account/change-password",
    requestNewPassword: "/request-new-password",
    newPassword: "/new-password",
}

export const Routes = () => (
  <Switch>
    <Route exact path={RoutingConfig.home} component={Home} />
    <Route path={RoutingConfig.login} component={Login} />
    <Route path={RoutingConfig.register} component={Register} />
    <OnlyLoggedInRoute exact path={RoutingConfig.account} component={Account} />
    <OnlyLoggedInRoute path={RoutingConfig.changePassword} component={ChangePassword} />
    <OnlyLoggedInRoute path={RoutingConfig.logout} component={Logout} />
    <Route path={RoutingConfig.requestNewPassword} component={RequestNewPassword} />
    <Route path={RoutingConfig.newPassword} component={NewPassword} />
  </Switch>
);