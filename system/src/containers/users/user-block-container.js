import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { login, logout } from '../../modules/users';
import UserBlock from '../../components/users/user-block';

class UserBlockContainer extends Component {

  static propTypes = {
    fieldConfigs: React.PropTypes.instanceOf(List).isRequired,
    loading: React.PropTypes.bool,
    error: React.PropTypes.any,
    user: React.PropTypes.instanceOf(Map)
  };

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(fields) {
    this.props.login(fields.email, fields.password);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return React.createElement(UserBlock,
      Object.assign({}, this.props, {
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout
      }));
  }

}

function mapStateToProps(state) {
  return {
    fieldConfigs: state.users.getIn(['entityConfig', 'fields']),
    loading: state.users.getIn(['ui', 'loading']),
    error: state.users.getIn(['ui', 'error']),
    user: state.users.getIn(['data', 'user'])
  };
}

export default connect(mapStateToProps, { login, logout })(UserBlockContainer);
