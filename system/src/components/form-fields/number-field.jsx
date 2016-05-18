import React from 'react';
import propTypes from './prop-types';

function NumberField({ field, inputId, fieldConfig, className, helpBlock }) {
  return (
    <div className={className}>
      <label htmlFor={inputId} className="col-sm-2 control-label">{fieldConfig.get('label')}</label>
      <div className="col-sm-10">
        <input
          id={inputId}
          type="number"
          step="0.01"
          className="form-control"
          placeholder={fieldConfig.get('label')}
          disabled={fieldConfig.get('disabled')}
          {...field}
        />
        {helpBlock}
      </div>
    </div>
  );
}

NumberField.propTypes = propTypes;

export default NumberField;
