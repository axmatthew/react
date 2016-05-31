import React, { Component } from 'react';
import { connect } from 'react-redux';
import cashFlowModule from '../../../../modules/cash-flows';
import EditCashFlowView from '../../components/EditCashFlowView';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class EditCashFlowViewContainer extends Component {

  static propTypes = Object.assign({}, EditCashFlowView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetch: React.PropTypes.func.isRequired
  });

  componentDidMount() {
    this.props.fetch(this.props.params._id);
  }

  render() {
    return React.createElement(
      EditCashFlowView,
      Object.assign({}, this.props, { params: undefined, fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, cashFlowModule.entityUrl, 'editView'), {
  fetch: cashFlowModule.fetch,

  // Transfer to presentation component
  update: cashFlowModule.update
})(EditCashFlowViewContainer);
