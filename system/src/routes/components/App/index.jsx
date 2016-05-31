import React from 'react';
import { List } from 'immutable';
import GPCalculatorContainer from '../../../common/containers/GPCalculatorContainer';
import Header from '../../../layouts/components/Header';
import Footer from '../../../layouts/components/Footer';
import Sidebar from '../../../layouts/components/Sidebar';
import HeaderDropdownContainer from '../../../layouts/containers/HeaderDropdownContainer';
import UserBlockContainer from '../../../layouts/containers/UserBlockContainer';
import './style.css';

function App({ children, entityConfigs, onAuthClick }) {
  return (
    <div className="wrapper">
      <Header headerDropdown={<HeaderDropdownContainer />} />
      <Sidebar
        entityConfigs={entityConfigs}
        userBlock={<UserBlockContainer />}
      />
      <section>
        <div id="authorize-div" style={{ display: 'none' }}>
          <span>Authorize access to Google Apps Script Execution API</span>
          <button
            id="authorize-button"
            className="btn btn-primary"
            onClick={onAuthClick}
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

App.propTypes = {
  children: React.PropTypes.node,
  entityConfigs: React.PropTypes.instanceOf(List).isRequired,
  onAuthClick: React.PropTypes.func.isRequired
};

export default App;
