import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cashFlowModule from '../../modules/cash-flows';
import purchaseOrderModule from '../../modules/purchase-orders';
import CashFlowListContextMenu from '../../components/cash-flows/cash-flow-list-context-menu';
import { baseMapStateToProps } from '../container-helpers';

class CashFlowListContextMenuContainer extends Component {

  static propTypes = CashFlowListContextMenu.propTypes;

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return React.createElement(CashFlowListContextMenu, this.props);
  }

}

export default connect(baseMapStateToProps.bind(null, cashFlowModule.entityUrl, 'listView'), {
  push,
  hideContextMenu: cashFlowModule.hideContextMenu,
  update: cashFlowModule.update,
  remove: cashFlowModule.remove,
  updatePurchaseOrder: purchaseOrderModule.update
})(CashFlowListContextMenuContainer);
