/* global gapi */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { autoLogin } from '../../../modules/users';
import enquiryModule from '../../../modules/enquiries';
import purchaseOrderModule from '../../../modules/purchase-orders';
import documentModule from '../../../modules/documents';
import cashFlowModule from '../../../modules/cash-flows';
import GPCalculatorContainer from '../../../containers/gp-calculator/gp-calculator-container';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Sidebar from '../../components/sidebar/sidebar';
import UserBlockContainer from '../users/user-block-container';
import HeaderDropdownContainer from '../header/header-dropdown-container';
import './app.css';

class App extends Component {
  static CLIENT_ID = '278064067602-nlgqlbtpqvlho5njgeo4b5kgu2929brt.apps.googleusercontent.com';
  static CLIENT_SECRET = 't9rViubCnTuAT7glgysFIwcO';
  static SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/script.external_request',
    'https://www.googleapis.com/auth/script.storage',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/tasks',
    'https://www.googleapis.com/auth/tasks.readonly',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  static propTypes = {
    children: React.PropTypes.node,
    entityConfigs: React.PropTypes.instanceOf(List).isRequired
  };

  constructor() {
    super();

    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentWillMount() {
    window.handleClientLoad = () => {
      this.googleAppScriptAuth();
    };

    // Try login the user for recurrence visit
    this.props.autoLogin();
  }

  googleAppScriptAuth() {
    this.checkAuth();

    // auto-refresh token
    const AUTO_REFRESH_INTERVAL_MS = 3600000;

    window.setInterval(() => {
      this.checkAuth();
    }, AUTO_REFRESH_INTERVAL_MS);
  }

  checkAuth() {
    gapi.auth.authorize({
      client_id: App.CLIENT_ID,
      scope: App.SCOPES.join(' '),
      immediate: true
    }, this.handleAuthResult);
  }

  handleAuthResult(authResult) {
    const authorizeDiv = document.getElementById('authorize-div');

    if (authResult && !authResult.error) {
      // Hide auth UI
      authorizeDiv.style.display = 'none';
    } else {
      // Show auth UI, allowing the user to initiate authorization by clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  // Initiate auth flow in response to user clicking authorize button.
  handleAuthClick() {
    gapi.auth.authorize({
      client_id: App.CLIENT_ID,
      scope: App.SCOPES.join(' '),
      immediate: false
    }, this.handleAuthResult);
  }

  render() {
    const { children, user, entityConfigs } = this.props;

    return (
      <div className="wrapper">
        <Header headerDropdown={<HeaderDropdownContainer />} />
        <Sidebar
          entityConfigs={user ? entityConfigs : List()}
          userBlock={<UserBlockContainer />}
        />
        <section>
          <div id="authorize-div" style={{ display: 'none' }}>
            <span>Authorize access to Google Apps Script Execution API</span>
            <button
              id="authorize-button"
              className="btn btn-primary"
              onClick={this.handleAuthClick}
            >
              Authorize
            </button>
          </div>
          {children}
        </section>
        <Footer />
        <GPCalculatorContainer />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.users.getIn(['data', 'user']),
    entityConfigs: List([
      state[enquiryModule.entityUrl].get('entityConfig'),
      state[purchaseOrderModule.entityUrl].get('entityConfig'),
      state[documentModule.entityUrl].get('entityConfig'),
      state[cashFlowModule.entityUrl].get('entityConfig'),
      Map({ label: 'Reports', url: 'reports', iconClass: 'graph' }),
      Map({ label: 'Settings', url: 'settings', iconClass: 'settings' })
    ])
  };
}

export default connect(mapStateToProps, { autoLogin })(App);
