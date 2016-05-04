/* global google */
import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import enquiryModule from '../../modules/enquiries';
import purchaseOrderModule from '../../modules/purchase-orders';
import ReportView from '../../components/reports/report-view';

class ReportViewContainer extends Component {

  static propTypes = Object.assign({}, ReportView.propTypes, {
    fetchAllEnquiries: React.PropTypes.func.isRequired,
    fetchAllPurchaseOrders: React.PropTypes.func.isRequired,
    unlistenAllEnquiries: React.PropTypes.func.isRequired,
    unlistenAllPurchaseOrders: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    google.load('visualization', '1.1', { packages: ['bar'], callback: () => {
      this.props.fetchAllEnquiries();
      this.props.fetchAllPurchaseOrders();
    } });
  }

  componentWillUnmount() {
    this.props.unlistenAllEnquiries();
    this.props.unlistenAllPurchaseOrders();
  }

  render() {
    return React.createElement(ReportView, this.props);
  }

}

function mapStateToProps(state) {
  return {
    user: state.users.getIn(['data', 'user']),
    enquiryListUi: state[enquiryModule.entityUrl].getIn(['listView', 'ui']),
    purchaseOrderListUi: state[purchaseOrderModule.entityUrl].getIn(['listView', 'ui']),
    enquiries: state[enquiryModule.entityUrl].getIn(['listView', 'data', 'entities']),
    purchaseOrders: state[purchaseOrderModule.entityUrl].getIn(['listView', 'data', 'entities'])
  };
}

export default connect(mapStateToProps, {
  fetchAllEnquiries: enquiryModule.fetchAll,
  fetchAllPurchaseOrders: purchaseOrderModule.fetchAll,
  unlistenAllEnquiries: enquiryModule.unlistenAll,
  unlistenAllPurchaseOrders: purchaseOrderModule.unlistenAll
})(ReportViewContainer);
