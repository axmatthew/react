import React from 'react';
import './context-menu.css';

function ContextSubMenu({ children, label }) {
  return (
    <li className="dropdown-submenu">
      <a tabIndex="-1" href="javascript:void(0);">{label}</a>
      <ul className="dropdown-menu">
        {children}
      </ul>
    </li>
  );
}

ContextSubMenu.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default ContextSubMenu;
