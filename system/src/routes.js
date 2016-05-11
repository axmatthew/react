import React from 'react';
import { Route } from 'react-router';
import App from './containers/app/app';
import EnquiryListViewContainer from './containers/enquiries/enquiry-list-view-container';
import NewEnquiryViewContainer from './containers/enquiries/new-enquiry-view-container';
import EditEnquiryViewContainer from './containers/enquiries/edit-enquiry-view-container';
import PurchaseOrderListViewContainer from
  './containers/purchase-orders/purchase-order-list-view-container';
import NewPurchaseOrderViewContainer from
  './containers/purchase-orders/new-purchase-order-view-container';
import EditPurchaseOrderViewContainer from
  './containers/purchase-orders/edit-purchase-order-view-container';
import DocumentListViewContainer from './containers/documents/document-list-view-container';
import NewDocumentViewContainer from './containers/documents/new-document-view-container';
import EditDocumentViewContainer from './containers/documents/edit-document-view-container';
import CashFlowListViewContainer from './containers/cash-flows/cash-flow-list-view-container';
import EditCashFlowViewContainer from './containers/cash-flows/edit-cash-flow-view-container';
import ReportViewContainer from './containers/reports/report-view-container';

export default (
  <Route path="/" component={App}>
    <Route path="index.html" />
    <Route path="reports" component={ReportViewContainer} />
    <Route path="enquiries" component={EnquiryListViewContainer} />
    <Route path="enquiries/new" component={NewEnquiryViewContainer} />
    <Route path="enquiries/edit/:_id" component={EditEnquiryViewContainer} />
    <Route path="purchaseOrders" component={PurchaseOrderListViewContainer} />
    <Route path="purchaseOrders/new/:enquiryId" component={NewPurchaseOrderViewContainer} />
    <Route path="purchaseOrders/edit/:_id" component={EditPurchaseOrderViewContainer} />
    <Route path="documents" component={DocumentListViewContainer} />
    <Route path="documents/new" component={NewDocumentViewContainer} />
    <Route path="documents/edit/:_id" component={EditDocumentViewContainer} />
    <Route path="cashFlows" component={CashFlowListViewContainer} />
    <Route path="cashFlows/edit/:_id" component={EditCashFlowViewContainer} />
  </Route>
);
