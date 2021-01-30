import { WEBHOOK_INTEGRATION } from '../constants';

const receiveIntegrationList = payload => ({ type: WEBHOOK_INTEGRATION.LIST_RECEIVED, payload });
const receiveIntegrationDetails = payload => ({ type: WEBHOOK_INTEGRATION.INTEGRATION_RECEIVED, payload });

export const webhookIntegrationActions = {
  receiveIntegrationList,
  receiveIntegrationDetails,
};