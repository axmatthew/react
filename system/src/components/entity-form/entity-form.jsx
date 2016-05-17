import React, { Component } from 'react';
import { Map } from 'immutable';
import { getFromValOrFunc } from '../../modules/entity-config-loader';
import Form from '../form/form';

class EntityForm extends Component {

  static propTypes = {
    entityConfig: React.PropTypes.instanceOf(Map).isRequired,
    ui: React.PropTypes.instanceOf(Map).isRequired,
    data: React.PropTypes.instanceOf(Map).isRequired,
    initialValues: React.PropTypes.instanceOf(Map),
    handleSubmit: React.PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.getFormInitialValues = this.getFormInitialValues.bind(this);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** Compute the initial values, based on the provided entity, props, or fieldConfig */
  getFormInitialValues() {
    const initialValues = {};
    const entity = this.props.data.get('entity');

    this.props.entityConfig.get('fields').forEach(field => {
      const name = field.get('name');

      if (entity) {
        // If entity is provided, set the initial value to the entity field
        initialValues[name] = entity.get(name);
      } else {
        let defaultValue;

        // If entity not provided, first try props.initialValue
        if (this.props.initialValues) {
          defaultValue = getFromValOrFunc(this.props.initialValues.get(name));
        }

        // then try entityConfig.fields.defaultValue
        if (defaultValue == null) {
          defaultValue = getFromValOrFunc(field.get('defaultValue'));
        }

        if (defaultValue != null) {
          initialValues[name] = defaultValue;
        }
      }
    });

    return initialValues;
  }

  // client side validation
  validate(fields) {
    const errors = {};

    this.props.entityConfig.get('fields').forEach(fieldConfig => {
      const name = fieldConfig.get('name');
      const validations = fieldConfig.get('validations');
      const value = fields[name];

      if (validations) {
        // validation: required
        if (validations.get('required')) {
          if (!value || value.trim() === '') {
            errors[name] = `${name} is required`;
          }
        }

        // custom validator
        if (validations.get('validator')) {
          const validator = validations.get('validator');
          errors[name] = validator(value);
        }
      }
    });

    return errors;
  }


  handleSubmit(fields) {
    const numericFields = {};

    // convert all numeric fields to Number type
    this.props.entityConfig.get('fields').forEach(fieldConfig => {
      const name = fieldConfig.get('name');

      if (fieldConfig.get('type') === 'number' && fields[name]) {
        numericFields[name] = Number(fields[name]);
      }
    });

    this.props.handleSubmit(Object.assign({}, fields, numericFields));
  }

  render() {
    // redux-form
    return (
      <Form
        form="entity-form"
        fields={this.props.entityConfig.get('fields').map(field => field.get('name')).toJS()}
        initialValues={this.getFormInitialValues()}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        fieldConfigs={this.props.entityConfig.get('fields')}
        entity={this.props.data.get('entity')}
      />
    );
  }

}

export default EntityForm;
