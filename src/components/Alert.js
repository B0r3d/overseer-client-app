import React from 'react'
import { ALERT_CONSTANTS } from '../redux';
import { Alert as AlertWidget } from 'reactstrap';

export const Alert = ({ alert }) => {
  switch(alert.type) {
    case ALERT_CONSTANTS.SUCCESS:
      return <AlertWidget color="success">{alert.message}</AlertWidget>
    case ALERT_CONSTANTS.WARNING:
      return <AlertWidget color="warning">{alert.message}</AlertWidget>
    case ALERT_CONSTANTS.ERROR:
      return <AlertWidget color="danger">{alert.message}</AlertWidget>
    default:
      return <AlertWidget color="secondary">{alert.message}</AlertWidget>
  }
}