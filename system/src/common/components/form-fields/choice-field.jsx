import React from 'react';
import propTypes from './prop-types';

function ChoiceField({ field, inputId, fieldConfig, className, helpBlock }) {
  return (
    <div className={className}>
      <label htmlFor={inputId} className="col-sm-2 control-label">{fieldConfig.get('label')}</label>
      <div className="col-sm-10">
        <select
          id={inputId}
          className="form-control"
          disabled={fieldConfig.get('disabled')}
          {...field}
        >
          {fieldConfig.get('choices').map(choice => (
            <option key={choice} value={choice}>{choice}</option>
          ))}
        </select>
        {helpBlock}
      </div>
    </div>
  );
}

ChoiceField.propTypes = propTypes;

export default ChoiceField;
