import React from 'react';
import './context-menu.css';

const ContextMenu = ({ children, display, left, top }) => (
  <div
    id="context-menu"
    className="dropdown clearfix"
    style={{
      display: display ? 'block' : 'none',
      left,
      top
    }}
  >
    <ul className="dropdown-menu" role="menu">
      {children}
    </ul>
  </div>
);

ContextMenu.propTypes = {
  display: React.PropTypes.bool.isRequired,
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  children: React.PropTypes.node.isRequired
};

export default ContextMenu;
