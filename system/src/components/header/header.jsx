/* global $ */
import React from 'react';

function Header({ headerDropdown }) {
  return (
    <header className="topnavbar-wrapper">
      <nav role="navigation" className="navbar topnavbar">
        <div className="navbar-header">
          <a href="javascript:void(0);" className="navbar-brand">
            <div className="brand-logo">
              <img src="angle/app/img/logo.png" alt="App Logo" className="img-responsive" />
            </div>
            <div className="brand-logo-collapsed">
              <img src="angle/app/img/logo-single.png" alt="App Logo" className="img-responsive" />
            </div>
          </a>
        </div>
        <div className="nav-wrapper">
          <ul className="nav navbar-nav">
            <li>
              {/* Button used to collapse the left sidebar. Only visible on tablet and desktops*/}
              <a
                href="javascript:void(0);"
                data-trigger-resize
                data-toggle-state="aside-collapsed"
                className="hidden-xs"
              >
                <em className="fa fa-navicon" />
              </a>
              {/* Button to show/hide the sidebar on mobile. Visible on mobile only.*/}
              <a
                href="javascript:void(0);"
                data-toggle-state="aside-toggled"
                data-no-persist="true"
                className="visible-xs sidebar-toggle"
              >
                <em className="fa fa-navicon" />
              </a>
            </li>
            <li>
              {/* Button used to collapse the left sidebar. Only visible on tablet and desktops*/}
              <a id="user-block-toggle" href="#user-block" data-toggle="collapse">
                <em className="icon-user" />
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {/* Search icon*/}
            <li className="hidden">
              <a href="javascript:void(0);" data-search-open>
                <em className="icon-magnifier" />
              </a>
            </li>
            <li className="bg-pink">
              <a
                href="javascript:void(0);"
                onClick={() => $('#gp-calculator').modal({ backdrop: false })}
              >
                <em className="fa fa-calculator" />
              </a>
            </li>
            {headerDropdown}
            <li className="visible-lg">
              <a href="javascript:void(0);" data-toggle-fullscreen>
                <em className="fa fa-expand" />
              </a>
            </li>
          </ul>
        </div>
        <form role="search" action="search.html" className="navbar-form">
          <div className="form-group has-feedback">
            <input type="text" placeholder="Type and hit enter ..." className="form-control" />
            <div data-search-dismiss className="fa fa-times form-control-feedback" />
          </div>
          <button type="submit" className="hidden btn btn-default">Submit</button>
        </form>
      </nav>
    </header>
  );
}

Header.propTypes = {
  headerDropdown: React.PropTypes.node.isRequired
};

export default Header;
