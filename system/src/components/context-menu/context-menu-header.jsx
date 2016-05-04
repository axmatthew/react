import React from 'react';

const ContextMenuHeader = ({ text }) => (
  <li className="dropdown-header">{text}</li>
);

ContextMenuHeader.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default ContextMenuHeader;
