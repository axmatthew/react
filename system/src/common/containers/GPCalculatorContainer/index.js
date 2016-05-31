/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GPCalculator from '../../components/GPCalculator';

class GPCalculatorContainer extends Component {

  static propTypes = GPCalculator.propTypes;

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
