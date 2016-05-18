import React from 'react';
import { Map } from 'immutable';

export const basePropTypes = {
  settings: React.PropTypes.instanceOf(Map),
  user: React.PropTypes.instanceOf(Map),
  entityConfig: React.PropTypes.instanceOf(Map).isRequired,
  ui: React.PropTypes.instanceOf(Map).isRequired,
  data: React.PropTypes.instanceOf(Map).isRequired
};
