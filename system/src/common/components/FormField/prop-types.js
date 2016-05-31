import React from 'react';
import { Map } from 'immutable';

export default {
  // redux-form
  field: React.PropTypes.any.isRequired,

  inputId: React.PropTypes.string.isRequired,
  fieldConfig: React.PropTypes.instanceOf(Map).isRequired,
  entity: React.PropTypes.instanceOf(Map),
  className: React.PropTypes.string.isRequired,
  helpBlock: React.PropTypes.element
};
