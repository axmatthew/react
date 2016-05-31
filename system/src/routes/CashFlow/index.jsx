import CashFlowListViewContainer from './containers/CashFlowListViewContainer';
import EditCashFlowViewContainer from './containers/EditCashFlowViewContainer';

export default [
  { path: 'cashFlows', component: CashFlowListViewContainer },
  { path: 'cashFlows/edit/:_id', component: EditCashFlowViewContainer }
];
