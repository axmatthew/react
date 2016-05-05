import React from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';

const HeaderDropdown = ({ newEnquiries }) => (
  <li className="dropdown dropdown-list">
    <a href="javascript:void(0);" data-toggle="dropdown">
      <em className="icon-bell" />
      <div className="label label-danger">{newEnquiries.size}</div>
    </a>
    <ul className="dropdown-menu animated flipInX">
      <li>
        <div className="list-group">
          <Link to="/enquiries" className="list-group-item">
            <div className="media-box">
              <div className="pull-left">
                {
                  newEnquiries.size
                  ? <em className="fa fa-warning fa-2x text-warning" />
                  : <em className="fa fa-check fa-2x text-success" />
                }
              </div>
              <div className="media-box-body clearfix">
                <p className="m0">Enquiries</p>
                <p className="m0 text-muted">
                  <small>{newEnquiries.size} 'New' enquiries</small>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </li>
    </ul>
  </li>
);

HeaderDropdown.propTypes = {
  newEnquiries: React.PropTypes.instanceOf(Map).isRequired
};

export default HeaderDropdown;
