import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import purchaseOrderModule from '../../modules/purchase-orders';
import NewPurchaseOrderView from '../../components/purchase-orders/new-purchase-order-view';
import { baseMapStateToProps } from '../container-helpers';

class NewPurchaseOrderViewContainer extends Component {

  static propTypes = Object.assign({}, NewPurchaseOrderView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetchEnquiryForNewView: React.PropTypes.func.isRequired,
    fetchDuplicatesForNewView: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchEnquiryForNewView(this.props.params.enquiryId);
    this.props.fetchDuplicatesForNewView(this.props.params.enquiryId);
  }

  render() {
    return React.createElement(NewPurchaseOrderView, Object.assign({}, this.props, {
      params: undefined,
      fetchEnquiryForNewView: undefined
    }));
  }

}

export default connect(baseMapStateToProps.bind(null, purchaseOrderModule.entityUrl, 'newView'), {
  fetchEnquiryForNewView: purchaseOrderModule.fetchEnquiryForNewView,
  fetchDuplicatesForNewView: purchaseOrderModule.fetchDuplicatesForNewView,

  // Transfer to presentation component
  create: purchaseOrderModule.create
})(NewPurchaseOrderViewContainer);
