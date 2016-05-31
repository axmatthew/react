import PurchaseOrderListViewContainer from './containers/PurchaseOrderListViewContainer';
import NewPurchaseOrderViewContainer from './containers/NewPurchaseOrderViewContainer';
import EditPurchaseOrderViewContainer from './containers/EditPurchaseOrderViewContainer';

export default [
  { path: 'purchaseOrders', component: PurchaseOrderListViewContainer },
  { path: 'purchaseOrders/new', component: NewPurchaseOrderViewContainer },
  { path: 'purchaseOrders/edit/:_id', component: EditPurchaseOrderViewContainer }
];
