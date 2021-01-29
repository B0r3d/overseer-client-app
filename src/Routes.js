import React from 'react'
import {Switch, Route} from "react-router-dom";
import { OnlyLoggedInRoute } from './components';
import { Account, Home, Login, Register, Logout, ChangePassword, RequestNewPassword, NewPassword, DeleteAccount, Page404, NewProject, Project, EditProject, ManageInvitation, Error } from './pages';

export const RoutingConfig = {
    home: "/",
    register: "/register",
    login: "/login",
    account: "/account",
    logout: "/logout",
    changePassword: "/account/change-password",
    requestNewPassword: "/request-new-password",
    newPassword: "/new-password",
    deleteAccount: "/account/delete-account",
    newProject: "/account/projects/new",
    projectPage: "/account/projects/:id",
    editProject: "/account/projects/:id/edit",
    acceptInvitation: "/accept-invitation",
    errorDetails: "/account/project/:id/error/:error_id",
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
    <OnlyLoggedInRoute path={RoutingConfig.deleteAccount} component={DeleteAccount} />
    <OnlyLoggedInRoute path={RoutingConfig.newProject} component={NewProject} />
    <OnlyLoggedInRoute path={RoutingConfig.editProject} component={EditProject} />
    <OnlyLoggedInRoute path={RoutingConfig.projectPage} component={Project} />
    <OnlyLoggedInRoute path={RoutingConfig.acceptInvitation} component={ManageInvitation} />
    <OnlyLoggedInRoute path={RoutingConfig.errorDetails} component={Error} />



    
    {/* 404 ROUTe, THIS HAS TO BE THE LAST ROUTE! */}
    <Route component={Page404} />
  </Switch>
);