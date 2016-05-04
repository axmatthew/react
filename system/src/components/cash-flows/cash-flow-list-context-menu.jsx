import React from 'react';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class CashFlowListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    update: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handlePaid = this.handlePaid.bind(this);
  }

  handlePaid() {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.update(entity.get(this.props.entityConfig.get('identity')), { done: true });
  }

  getContextMenuItems() {
    return <ContextMenuItem label="Paid" onItemClick={this.handlePaid} />;
  }

}

export default CashFlowListContextMenu;
