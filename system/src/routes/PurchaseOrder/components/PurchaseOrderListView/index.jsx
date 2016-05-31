/* global swal */
import React from 'react';
import PurchaseOrderListContextMenuContainer from
  '../../containers/PurchaseOrderListContextMenuContainer';
import ListView from '../../../../common/views/list-view';

class PurchaseOrderListView extends ListView {

  static propTypes = ListView.propTypes;

  /** Override to provide extra message in alert */
  handleRemoveItem(entity) {
    // FIXME: duplicate code with purchase-order-list-context-menu.jsx
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

  getContextMenu() {
    return <PurchaseOrderListContextMenuContainer />;
  }

}

export default PurchaseOrderListView;
