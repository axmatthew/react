import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
  cashFlowSetListFilter: cashFlowModule.setListFilter,
  cashFlowListSearch: cashFlowModule.listSearch,

  documentListSearch: documentModule.listSearch,
  generateDocument: documentModule.generateDocument
})(PurchaseOrderListContextMenuContainer);
