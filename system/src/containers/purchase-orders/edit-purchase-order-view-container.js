import React, { Component } from 'react';
import { connect } from 'react-redux';
import purchaseOrderModule from '../../modules/purchase-orders';
import EditPurchaseOrderView from '../../components/purchase-orders/edit-purchase-order-view';
import { baseMapStateToProps } from '../container-helpers';

class EditPurchaseOrderViewContainer extends Component {

  static propTypes = Object.assign({}, EditPurchaseOrderView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetch: React.PropTypes.func.isRequired
  });

  componentDidMount() {
    this.props.fetch(this.props.params._id);
  }

  render() {
    return React.createElement(
      EditPurchaseOrderView,
      Object.assign({}, this.props, { fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, purchaseOrderModule.entityUrl, 'editView'), {
  fetch: purchaseOrderModule.fetch,

  // Transfer to presentation component
  update: purchaseOrderModule.update
})(EditPurchaseOrderViewContainer);
