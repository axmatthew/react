import React, { Component } from 'react';
import MainContent from '../common/main-content';
import EntityForm from '../entity-form/entity-form';
import { basePropTypes } from '../component-helpers';

class NewView extends Component {

  static propTypes = Object.assign({}, basePropTypes, {
    create: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialValues() {
    return null;
  }

  handleSubmit(fields) {
    this.props.create(fields, this.props.entityConfig.get('url'));
  }

  render() {
    const { entityConfig, ui, data } = this.props;

    return (
      <MainContent
        header={ui.get('title')}
        loading={ui.get('loading')}
        error={ui.get('error')}
      >
        <EntityForm
          entityConfig={entityConfig}
          ui={ui}
          data={data}
          initialValues={this.getInitialValues()}
          handleSubmit={this.handleSubmit}
        />
      </MainContent>
    );
  }

}

export default NewView;
