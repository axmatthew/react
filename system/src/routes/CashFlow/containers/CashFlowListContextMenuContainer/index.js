/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cashFlowModule from '../../../../modules/cash-flows';
import purchaseOrderModule from '../../../../modules/purchase-orders';
import CashFlowListContextMenu from '../../components/CashFlowListContextMenu';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class CashFlowListContextMenuContainer extends Component {

  static propTypes = CashFlowListContextMenu.propTypes;

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
