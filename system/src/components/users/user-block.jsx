import React from 'react';
import { List, Map } from 'immutable';
import LoadingOrError from '../common/loading-or-error';
import Form from '../form/form';
import './user-block.css';

const UserBlock = ({ fieldConfigs, loading, error, user, handleLogin, handleLogout }) => (
  <LoadingOrError loading={loading} error={error}>
    <li className="has-user-block">
      <div id="user-block" className="collapse">
        <div className="item user-block m">
          {
            user
            ? (
              <div className="user-block-info">
                <span className="user-block-name">Hello, {user.get('username')}</span>
                <button
                  type="submit"
                  className="btn btn-block btn-default btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )
            : (
              <Form
                form="login-form"
                fields={fieldConfigs.map(field => field.get('name')).toJS()}
                submitLabel={'Login'}
                onSubmit={handleLogin}
                fieldConfigs={fieldConfigs}
              />
            )
          }
        </div>
      </div>
    </li>
  </LoadingOrError>
);

UserBlock.propTypes = {
  fieldConfigs: React.PropTypes.instanceOf(List).isRequired,
  loading: React.PropTypes.bool,
  error: React.PropTypes.any,
  user: React.PropTypes.instanceOf(Map),
  handleLogin: React.PropTypes.func.isRequired,
  handleLogout: React.PropTypes.func.isRequired
};

export default UserBlock;
