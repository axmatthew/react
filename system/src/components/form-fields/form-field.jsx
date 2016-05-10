import React, { Component } from 'react';
import { Map } from 'immutable';
import classNames from 'classnames';
import TextField from './text-field';
import NumberField from './number-field';
import PasswordField from './password-field';
import HiddenField from './hidden-field';
import TextareaField from './textarea-field';
import DateField from './date-field';
import ChoiceField from './choice-field';
import BoolField from './bool-field';

// TODO: use some design pattern

class FormField extends Component {

  getFieldClass() {
    switch (this.props.fieldConfig.get('type')) {
      case 'text':
        return TextField;
      case 'number':
        return NumberField;
      case 'password':
        return PasswordField;
      case 'hidden':
        return HiddenField;
      case 'textarea':
        return TextareaField;
      case 'date':
        return DateField;
      case 'bool':
        return BoolField;
      case 'choice':
        return ChoiceField;
      default:
        return TextField;
    }
  }

  render() {
    const element = { tag: this.getFieldClass() };

    // validation related helpers
    const { field } = this.props;
    const className = classNames({
      'form-group': true,
      'has-error': this.props.field.touched && this.props.field.error
    });
    const helpBlock = field.touched && field.error
      ? <div className="help-block">{field.error}</div>
      : null;

    return <element.tag {...this.props} className={className} helpBlock={helpBlock} />;
  }

}

FormField.propTypes = {
  // redux-form
  field: React.PropTypes.any.isRequired,

  inputId: React.PropTypes.string.isRequired,
  fieldConfig: React.PropTypes.instanceOf(Map).isRequired,
  entity: React.PropTypes.instanceOf(Map)
};

export default FormField;
