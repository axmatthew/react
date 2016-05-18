import React from 'react';
import propTypes from './prop-types';

function HiddenField({ field, inputId }) {
  return (
    <input id={inputId} type="hidden" {...field} />
  );
}

HiddenField.propTypes = propTypes;

export default HiddenField;
