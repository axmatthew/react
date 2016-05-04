import React from 'react';

const ContextMenuItem = ({ label, onItemClick }) => (
  <li><a tabIndex={-1} href="javascript:void(0);" onClick={onItemClick}>{label}</a></li>
);

ContextMenuItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  onItemClick: React.PropTypes.func.isRequired
};

export default ContextMenuItem;
