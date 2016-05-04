/* global $ swal */
import React from 'react';
import { Map } from 'immutable';
import ContextSubMenu from '../context-menu/context-sub-menu';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class PurchaseOrderListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    cashFlowEntityConfig: React.PropTypes.instanceOf(Map).isRequired
  });

  constructor() {
    super();

    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleViewCashFlows = this.handleViewCashFlows.bind(this);
    this.handleCreateCashFlows = this.handleCreateCashFlows.bind(this);
  }

  /** Override to provide extra message in alert */
  handleRemoveItem() {
    const entity = this.props.data.get('contextMenuEntity');

    // FIXME: duplicate code with purchase-order-list-view.jsx
    swal({
      title: 'Are you sure?',
      text: 'Delete purchase order will not delete related cash flow records.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!'
    }, () => {
      this.props.remove(entity.get('_id'));
    });
  }

  handleStatusUpdate(newStatus) {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.update(entity.get('_id'), { status: newStatus });
  }

  handleViewCashFlows() {
    const entity = this.props.data.get('contextMenuEntity');

    // Redirect to cash flow list view with search value as enqiuryNum
    this.props.cashFlowListSearch(entity.get('poNum').substring(1));
    this.props.push(this.props.cashFlowEntityConfig.get('url'));
  }

  handleCreateCashFlows() {
    const entity = this.props.data.get('contextMenuEntity');

    swal({
      title: 'Information',
      text: 'Create new cash flow records will not delete existing ones.',
      type: 'info',
      showCancelButton: true
    }, () => {
      this.props.createCashFlows(entity.get('_id'));
    });
  }

  getContextMenuItems() {
    const statusMenus = ['New', 'Sample', 'Manufacturing', 'Delivering', 'Done', 'Closed'];

    return [
      <ContextSubMenu key="Status" label="Status">
        {
          statusMenus.map(menu => (
            <ContextMenuItem
              key={menu}
              label={menu}
              onItemClick={() => this.handleStatusUpdate(menu)}
            />
          ))
        }
      </ContextSubMenu>,
      <ContextMenuItem
        key="View Cash Flows"
        label="View Cash Flows"
        onItemClick={this.handleViewCashFlows}
      />,
      <ContextMenuItem
        key="Create Cash Flows"
        label="Create Cash Flows"
        onItemClick={this.handleCreateCashFlows}
      />
    ];
  }

}

export default PurchaseOrderListContextMenu;
