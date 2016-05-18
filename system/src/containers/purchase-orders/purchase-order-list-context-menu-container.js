/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../modules/enquiries';
import purchaseOrderModule from '../../modules/purchase-orders';
import documentModule from '../../modules/documents';
import cashFlowModule from '../../modules/cash-flows';
import PurchaseOrderListContextMenu from
  '../../components/purchase-orders/purchase-order-list-context-menu';
import { baseMapStateToProps } from '../container-helpers';

class PurchaseOrderListContextMenuContainer extends Component {

  static propTypes = PurchaseOrderListContextMenu.propTypes;

  render() {
    return React.createElement(PurchaseOrderListContextMenu, this.props);
  }

}

function mapStateToProps(state) {
  return Object.assign({}, baseMapStateToProps(purchaseOrderModule.entityUrl, 'listView', state), {
    documentEntityConfig: state[documentModule.entityUrl].get('entityConfig'),
    cashFlowEntityConfig: state[cashFlowModule.entityUrl].get('entityConfig')
  });
}

export default connect(mapStateToProps, {
  push,
  hideContextMenu: purchaseOrderModule.hideContextMenu,
  update: purchaseOrderModule.update,
  remove: purchaseOrderModule.remove,
  updateEnquiry: enquiryModule.update,
  createCashFlows: purchaseOrderModule.createCashFlows,
  cashFlowListSearch: cashFlowModule.listSearch,
  cashFlowSetListFilter: cashFlowModule.setListFilter,

  documentListSearch: documentModule.listSearch,
  documentSetListFilter: documentModule.setListFilter,
  generateDocument: documentModule.generateDocument
})(PurchaseOrderListContextMenuContainer);
