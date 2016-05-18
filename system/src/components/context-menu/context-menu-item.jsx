import React from 'react';

function ContextMenuItem({ label, onItemClick }) {
  return (
    <li><a tabIndex={-1} href="javascript:void(0);" onClick={onItemClick}>{label}</a></li>
  );
}

ContextMenuItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  onItemClick: React.PropTypes.func.isRequired
};

export default ContextMenuItem;
