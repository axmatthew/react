import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { login, logout } from '../../modules/users';
import UserBlock from '../../components/users/user-block';
import { basePropTypes } from '../container-helpers';

class UserBlockContainer extends Component {

  static propTypes = Object.assign({}, basePropTypes, {
    login: React.PropTypes.func.isRequired
  });

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
      Object.assign({}, {
        fieldConfigs: this.props.entityConfig.get('fields'),
        user: this.props.data.get('user'),
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout
      }));
  }

}

function mapStateToProps(state) {
  return {
    entityConfig: state.users.get('entityConfig'),
    ui: state.users.get('ui'),
    data: state.users.get('data')
  };
}

export default connect(mapStateToProps, { login, logout })(UserBlockContainer);
