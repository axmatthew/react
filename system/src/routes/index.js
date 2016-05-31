import CashFlow from './CashFlow';
import Document from './Document';
import Enquiry from './Enquiry';
import PurchaseOrder from './PurchaseOrder';
import Report from './Report';
import Setting from './Setting';
import AppContainer from './containers/AppContainer';

export default {
  path: '/',
  component: AppContainer,
  childRoutes: [
    ...CashFlow,
    ...Document,
    ...Enquiry,
    ...PurchaseOrder,
    ...Report,
    ...Setting
  ]
};
