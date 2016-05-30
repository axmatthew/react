import React from 'react';
import propTypes from './prop-types';

function PasswordField({ field, inputId, fieldConfig, className, helpBlock }) {
  return (
    <div className={className}>
      <label htmlFor={inputId} className="col-sm-2 control-label">{fieldConfig.get('label')}</label>
      <div className="col-sm-10">
        <input
          id={inputId}
          type="password"
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

PasswordField.propTypes = propTypes;

export default PasswordField;
