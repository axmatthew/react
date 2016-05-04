import React from 'react';
import propTypes from './prop-types';

const HiddenField = ({ field, inputId }) => (
  <input id={inputId} type="hidden" {...field} />
);

HiddenField.propTypes = propTypes;

export default HiddenField;
