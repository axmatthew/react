import React, { Component } from 'react';
import propTypes from './prop-types';

class DateField extends Component {

  componentDidMount() {
    $(`#datetimepicker-${this.props.inputId}`).datetimepicker({
      format: 'YYYY-MM-DD'
    });
  }

  render() {
    const { field, inputId, fieldConfig, className, helpBlock } = this.props;

    return (
      <div className={className}>
        <label htmlFor={inputId} className="col-sm-2 control-label">
          {fieldConfig.get('label')}
        </label>
        <div className="col-sm-10">
          <div id={`datetimepicker-${inputId}`} className="input-group date">
            <input
              id={inputId}
              type="text"
              className="form-control"
              placeholder={fieldConfig.get('label')}
              disabled={fieldConfig.get('disabled')}
              {...field}
            />
            <span className="input-group-addon">
              <span className="fa fa-calendar"></span>
            </span>
          </div>
          {helpBlock}
        </div>
      </div>
    );
  }

}

DateField.propTypes = propTypes;

export default DateField;
