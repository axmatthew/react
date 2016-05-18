/* global swal */
import React, { Component } from 'react';
import ContextMenu from '../context-menu/context-menu';
import ContextMenuItem from '../context-menu/context-menu-item';
import { basePropTypes } from '../component-helpers';

class ListContextMenu extends Component {

  static propTypes = Object.assign({}, basePropTypes, {
    children: React.PropTypes.node,
    push: React.PropTypes.func.isRequired,
    hideContextMenu: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  componentWillMount() {
    // Hide context menu on body click
    $(document.body).on('click', () => {
      if (this.props.ui.get('displayContextMenu')) {
        this.props.hideContextMenu();
      }
    });
  }

  getContextMenuItems() {
    return false;
  }

  handleEditItem() {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.push(`${this.props.entityConfig.get('url')}/edit/${entity.get('_id')}`);
  }

  handleRemoveItem() {
    const entity = this.props.data.get('contextMenuEntity');

    // FIXME: duplicate code with list-view.jsx
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!'
    }, () => {
      this.props.remove(entity.get('_id'));
    });
  }

  render() {
    const { ui } = this.props;

    // TODO: Use some design pattern
    const displayEditButton = ui.get('listActions').indexOf('edit') !== -1;
    const displayDeleteButton = ui.get('listActions').indexOf('delete') !== -1;

    return (
      <ContextMenu
        display={ui.get('displayContextMenu')}
        left={ui.get('contextMenuLeft')}
        top={ui.get('contextMenuTop')}
      >
        {
          displayEditButton
          ? <ContextMenuItem label="Edit" onItemClick={this.handleEditItem} />
          : null
        }
        {
          displayDeleteButton
          ? <ContextMenuItem label="Delete" onItemClick={this.handleRemoveItem} />
          : null
        }
        {this.getContextMenuItems()}
      </ContextMenu>
    );
  }

}

export default ListContextMenu;
