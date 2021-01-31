import { TELEGRAM_INTEGRATION } from '../constants';

const receiveIntegrationList = payload => ({ type: TELEGRAM_INTEGRATION.LIST_RECEIVED, payload });
const receiveIntegrationDetails = payload => ({ type: TELEGRAM_INTEGRATION.INTEGRATION_RECEIVED, payload });

export const telegramIntegrationActions = {
  receiveIntegrationList,
  receiveIntegrationDetails,
};