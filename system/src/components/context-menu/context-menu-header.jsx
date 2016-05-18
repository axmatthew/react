import React from 'react';

function ContextMenuHeader({ text }) {
  return (
    <li className="dropdown-header">{text}</li>
  );
}

ContextMenuHeader.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default ContextMenuHeader;
