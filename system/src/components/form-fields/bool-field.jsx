import React from 'react';
import propTypes from './prop-types';

const BoolField = ({ field, inputId, fieldConfig, className, helpBlock }) => (
  <div className={className}>
    <label htmlFor={inputId} className="col-sm-2 control-label">{fieldConfig.get('label')}</label>
    <div className="col-sm-10">
      <div className="checkbox c-checkbox">
        <label>
          <input
            id={inputId}
            type="checkbox"
            disabled={fieldConfig.get('disabled')}
            {...field}
          />
          <span className="fa fa-check"></span>
        </label>
      </div>
      {helpBlock}
    </div>
  </div>
);

BoolField.propTypes = propTypes;

export default BoolField;
