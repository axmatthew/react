import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { fetch, update } from '../../../../modules/settings';
import SettingView from '../../components/SettingView';

class SettingViewContainer extends Component {

  static propTypes = {
    ui: React.PropTypes.instanceOf(Map),
    data: React.PropTypes.instanceOf(Map).isRequired,
    fetch: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  handleUpdate(fields) {
    this.props.update(fields);
  }

  render() {
    return React.createElement(SettingView, Object.assign({}, this.props, {
      handleUpdate: this.handleUpdate,
      fetch: undefined,
      update: undefined
    }));
  }

}

function mapStateToProps(state) {
  return {
    ui: state.settings.get('ui'),
    data: state.settings.get('data')
  };
}

export default connect(mapStateToProps, { fetch, update })(SettingViewContainer);
