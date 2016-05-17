import React from 'react';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class CashFlowListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    updatePurchaseOrder: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handlePaid = this.handlePaid.bind(this);
  }

  handlePaid() {
    const entity = this.props.data.get('contextMenuEntity');
    const setPaid = !entity.get('done');
    this.props.update(entity.get(this.props.entityConfig.get('identity')), { done: setPaid });

    // set related payment flag
    switch (entity.get('type')) {
      case 0:
        // case client deposit
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidDeposit: setPaid });
        break;
      case 1:
        // case client remaining
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidRemaining: setPaid });
        break;
      case 2:
        // case factory deposit, and set status to Manufacturing
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidFactoryDeposit: setPaid, status: setPaid ? 'Manufacturing' : 'Sample' });
        break;
      case 3:
        // case factory remaining, and set status to Delivering
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidFactoryRemaining: setPaid, status: setPaid ? 'Delivering' : 'Manufacturing' });
        break;
      default:
        // EMPTY
    }
  }

  getContextMenuItems() {
    return <ContextMenuItem label="Paid / UnPaid" onItemClick={this.handlePaid} />;
  }

}

export default CashFlowListContextMenu;
