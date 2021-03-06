import React from 'react';
import './data-table-toolbar.css';

function DataTableToolbarButton({ faClassName, label, onButtonClick }) {
  return (
    <button
      type="button"
      className="btn btn-default"
      title={label}
      onClick={onButtonClick}
    >
      <span className={`fa ${faClassName}`}></span>
      &nbsp;
      <span className="hidden-xs">{label}</span>
    </button>
  );
}

DataTableToolbarButton.propTypes = {
  label: React.PropTypes.string.isRequired,
  onButtonClick: React.PropTypes.func.isRequired
};

export default DataTableToolbarButton;
