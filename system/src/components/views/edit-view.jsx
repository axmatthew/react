import React, { Component } from 'react';
import MainContent from '../../common/components/MainContent';
import EntityForm from '../entity-form/entity-form';
import { basePropTypes } from '../component-helpers';

class EditView extends Component {

  static propTypes = Object.assign({}, basePropTypes, {
    update: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {
    this.props.update(fields._id, fields, this.props.entityConfig.get('url'));
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
          handleSubmit={this.handleSubmit}
        />
      </MainContent>
    );
  }

}

export default EditView;
