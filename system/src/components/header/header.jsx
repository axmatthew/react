import React from 'react';

const Header = () => (
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
          <li className="dropdown dropdown-list hidden">
            <a href="javascript:void(0);" data-toggle="dropdown">
              <em className="icon-bell" />
              <div className="label label-danger">11</div>
            </a>
            <ul className="dropdown-menu animated flipInX">
              <li>
                <div className="list-group">
                  <a href="javascript:void(0);" className="list-group-item">
                    <div className="media-box">
                      <div className="pull-left">
                        <em className="fa fa-twitter fa-2x text-info" />
                      </div>
                      <div className="media-box-body clearfix">
                        <p className="m0">New followers</p>
                        <p className="m0 text-muted">
                          <small>4 unquoted enquiries</small>
                        </p>
                      </div>
                    </div>
                  </a>
                  <a href="javascript:void(0);" className="list-group-item">
                    <div className="media-box">
                      <div className="pull-left">
                        <em className="fa fa-envelope fa-2x text-warning" />
                      </div>
                      <div className="media-box-body clearfix">
                        <p className="m0">New e-mails</p>
                        <p className="m0 text-muted">
                          <small>10 payment to be received</small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </li>
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

export default Header;
