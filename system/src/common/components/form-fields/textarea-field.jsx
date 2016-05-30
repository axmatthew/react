import React from 'react';
import propTypes from './prop-types';

function TextareaField({ field, inputId, fieldConfig, className, helpBlock }) {
  return (
    <div className={className}>
      <label htmlFor={inputId} className="col-sm-2 control-label">{fieldConfig.get('label')}</label>
      <div className="col-sm-10">
        <textarea
          id={inputId}
          className="form-control"
          rows="5"
          placeholder={fieldConfig.get('label')}
          disabled={fieldConfig.get('disabled')}
          {...field}
        />
        {helpBlock}
      </div>
    </div>
  );
}

TextareaField.propTypes = propTypes;

export default TextareaField;
