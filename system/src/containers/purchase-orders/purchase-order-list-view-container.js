import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import purchaseOrderModule from '../../modules/purchase-orders';
import PurchaseOrderListView from '../../components/purchase-orders/purchase-order-list-view';
import { baseMapStateToProps } from '../container-helpers';

class PurchaseOrderListViewContainer extends Component {

  static propTypes = Object.assign({}, PurchaseOrderListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired
  });

  // FIXME: duplicate code with EnquiryListViewContainer
  componentDidMount() {
    // fetchAll if no entities, and do not unlisten on unmount
    if (this.props.data.get('entities').size === 0) {
      this.props.fetchAll();
    }
  }

  // FIXME: duplicate code with EnquiryListViewContainer
  componentWillReceiveProps(nextProps) {
    // fetch data after login
    if (this.props.user !== nextProps.user) {
      if (this.props.data.get('entities').size === 0) {
        this.props.fetchAll();
      }
    }
  }

  render() {
    return React.createElement(PurchaseOrderListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, purchaseOrderModule.entityUrl, 'listView'), {
  fetchAll: purchaseOrderModule.fetchAll,

  // Transfer to presentation component
  push,
  listSearch: purchaseOrderModule.listSearch,
  setListFilter: purchaseOrderModule.setListFilter,
  setPage: purchaseOrderModule.setPage,
  toggleClosedDone: purchaseOrderModule.toggleClosedDone,
  showContextMenu: purchaseOrderModule.showContextMenu,
  remove: purchaseOrderModule.remove
})(PurchaseOrderListViewContainer);
