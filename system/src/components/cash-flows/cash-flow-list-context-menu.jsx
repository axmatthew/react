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
    this.props.update(entity.get(this.props.entityConfig.get('identity')), { done: true });

    switch (entity.get('type')) {
      case 0:
        // case client deposit: set related payment flag
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidDeposit: true });
        break;
      case 1:
        // case client remaining: set related payment flag
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidRemaining: true });
        break;
      case 2:
        // case factory deposit: set related payment flag, and set status to Manufacturing
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidFactoryDeposit: true, status: 'Manufacturing' });
        break;
      case 3:
        // case factory remaining: set related payment flag, and set status to Delivering
        this.props.updatePurchaseOrder(entity.get('purchaseOrderId'),
          { paidFactoryRemaining: true, status: 'Delivering' });
        break;
      default:
        // EMPTY
    }
  }

  getContextMenuItems() {
    return <ContextMenuItem label="Paid" onItemClick={this.handlePaid} />;
  }

}

export default CashFlowListContextMenu;
