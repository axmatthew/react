import React from 'react';
import { reduxForm } from 'redux-form';
import { List, Map } from 'immutable';
import FormField from '../form-fields/form-field';

// redux-form
function Form({
  fields, submitLabel, handleSubmit,
  resetForm, submitting, fieldConfigs, entity
}) {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      {
        fieldConfigs.filter(field => !field.get('notEditable')).map(field => (
          <FormField
            key={field.get('name')}
            field={fields[field.get('name')]}
            inputId={`entity-form-${field.get('name')}`}
            fieldConfig={field}
            entity={entity}
          />
        ))
      }
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
            {submitLabel || 'Submit'}
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-default btn-lg"
            disabled={submitting}
            onClick={resetForm}
          >
            Reset Defaults
          </button>
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  // redux-form
  fields: React.PropTypes.object.isRequired,
  submitLabel: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,

  fieldConfigs: React.PropTypes.instanceOf(List).isRequired,
  entity: React.PropTypes.instanceOf(Map)
};

// redux-form
export default reduxForm()(Form);
