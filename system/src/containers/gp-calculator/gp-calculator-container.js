import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import GPCalculator from '../../components/gp-calculator/gp-calculator';

class GPCalculatorContainer extends Component {

  static propTypes = GPCalculator.propTypes;

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return React.createElement(GPCalculator, this.props);
  }

}

function mapStateToProps(state) {
  return {
    settings: state.settings.get('data')
  };
}

export default connect(mapStateToProps)(GPCalculatorContainer);
