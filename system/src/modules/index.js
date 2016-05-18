import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import enquiryModule from './enquiries';
import purchaseOrderModule from './purchase-orders';
import documentModule from './documents';
import cashFlowModule from './cash-flows';
import users from './users';
import settings from './settings';

export default combineReducers({
  [enquiryModule.entityUrl]: enquiryModule.reducer,
  [purchaseOrderModule.entityUrl]: purchaseOrderModule.reducer,
  [documentModule.entityUrl]: documentModule.reducer,
  [cashFlowModule.entityUrl]: cashFlowModule.reducer,
  users,
  settings,
  // react-router-redux
  routing,
  // redux-form
  form
});
