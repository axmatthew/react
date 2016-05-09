import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import purchaseOrderModule from '../../modules/purchase-orders';
import PurchaseOrderListView from '../../components/purchase-orders/purchase-order-list-view';
import { baseMapStateToProps } from '../container-helpers';

class PurchaseOrderListViewContainer extends Component {

  static propTypes = Object.assign({}, PurchaseOrderListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired,
    fetchBy: React.PropTypes.func.isRequired,
    unlistenAll: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    // user already set, i.e. from navigating
    const username = this.props.user && this.props.user.get('username');
    this.fetchByUsername(username);
  }

  componentWillReceiveProps(nextProps) {
    // only fetch data related to the user by default
    if (this.props.user !== nextProps.user) {
      const username = nextProps.user && nextProps.user.get('username');

      this.fetchByUsername(username);
    }

    // if ui.filters changed
    if (this.props.ui.get('filters') !== nextProps.ui.get('filters')) {
      const salesFilter = nextProps.ui.get('filters')
        .find(filter => filter.get('name') === 'sales');

      // if the sales filter is set to empty string, fetchAll
      if (salesFilter) {
        if (!salesFilter.get('value')) {
          this.props.fetchAll();
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.unlistenAll();
  }

  fetchByUsername(username) {
    if (username) {
      // FIXME: fix hard code fetchAll for purchase staff
      if (username === 'Purchase') {
        this.props.fetchAll();
      } else {
        this.props.fetchBy('sales', username);
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
  fetchBy: purchaseOrderModule.fetchBy,
  unlistenAll: purchaseOrderModule.unlistenAll,

  // Transfer to presentation component
  push,
  listSearch: purchaseOrderModule.listSearch,
  setListFilter: purchaseOrderModule.setListFilter,
  setPage: purchaseOrderModule.setPage,
  toggleClosedDone: purchaseOrderModule.toggleClosedDone,
  showContextMenu: purchaseOrderModule.showContextMenu,
  remove: purchaseOrderModule.remove
})(PurchaseOrderListViewContainer);
