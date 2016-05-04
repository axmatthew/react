import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import cashFlowModule from '../../modules/cash-flows';
import EditCashFlowView from '../../components/cash-flows/edit-cash-flow-view';
import { baseMapStateToProps } from '../container-helpers';

class EditCashFlowViewContainer extends Component {

  static propTypes = Object.assign({}, EditCashFlowView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetch: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetch(this.props.params._id);
  }

  render() {
    return React.createElement(
      EditCashFlowView,
      Object.assign({}, this.props, { fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, cashFlowModule.entityUrl, 'editView'), {
  fetch: cashFlowModule.fetch,

  // Transfer to presentation component
  update: cashFlowModule.update
})(EditCashFlowViewContainer);
