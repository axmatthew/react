import React, { Component } from 'react';
import './data-table-toolbar.css';

class DataTableToolbar extends Component {

  static propTypes = {
    search: React.PropTypes.string,
    handleSearchInput: React.PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(event) {
    if (event.keyCode === 13) {
      this.props.handleSearchInput(event.currentTarget.value);
    }
  }

  render() {
    return (
      <div className="list-toolbar clearfix">
        <div className="btn-group pull-right">
          {this.props.children}
        </div>

        <div className="pull-right">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            defaultValue={this.props.search}
            onKeyDown={this.handleSearchInput}
          />
        </div>
      </div>
    );
  }

}

export default DataTableToolbar;
