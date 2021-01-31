import React from 'react'
import {Switch, Route} from "react-router-dom";
import { OnlyLoggedInRoute } from './components';
import { Account, Home, Login, Register, Logout, ChangePassword, RequestNewPassword, NewPassword, DeleteAccount, Page404, NewProject, Project, EditProject, ManageInvitation, Error, NewWebhookIntergration, WebhookIntegration, EditTelegramIntegration } from './pages';
import { EditWebhookIntegration } from './pages/EditWebhookIntegration';
import { NewTelegramIntergration } from './pages/NewTelegramIntegration';
import { TelegramIntegration } from './pages/TelegramIntegration';

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
    newWebhookIntegration: "/account/project/:id/webhook-integration/new",
    webhookintegration: "/account/project/:id/webhook-integration/:integration_id",
    editWebhookintegration: "/account/project/:id/webhook-integration/:integration_id/edit",
    newTelegramIntegration: "/account/project/:id/telegram-integration/new",
    telegramintegration: "/account/project/:id/telegram-integration/:integration_id",
    editTelegramintegration: "/account/project/:id/telegram-integration/:integration_id/edit",
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
    <OnlyLoggedInRoute path={RoutingConfig.newWebhookIntegration} component={NewWebhookIntergration} />
    <OnlyLoggedInRoute path={RoutingConfig.editWebhookintegration} component={EditWebhookIntegration} />
    <OnlyLoggedInRoute path={RoutingConfig.webhookintegration} component={WebhookIntegration} />
    <OnlyLoggedInRoute path={RoutingConfig.newTelegramIntegration} component={NewTelegramIntergration} />
    <OnlyLoggedInRoute path={RoutingConfig.editTelegramintegration} component={EditTelegramIntegration} />
    <OnlyLoggedInRoute path={RoutingConfig.telegramintegration} component={TelegramIntegration} />
    
    {/* 404 ROUTe, THIS HAS TO BE THE LAST ROUTE! */}
    <Route component={Page404} />
  </Switch>
);