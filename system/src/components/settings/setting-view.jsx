import React from 'react';
import { fromJS, Map } from 'immutable';
import MainContent from '../../common/components/main-content';
import Form from '../../common/components/form/form';

function SettingView({ ui, data, handleUpdate }) {
  return (
    <MainContent
      header="Settings"
      loading={ui.get('loading')}
      error={ui.get('error')}
    >
      <Form
        form="settings-form"
        fields={Object.keys(data.toJS())}
        initialValues={data.toJS()}
        onSubmit={handleUpdate}
        fieldConfigs={fromJS(Object.keys(data.toJS()).map(name => (
          { label: name, name, type: 'text' }
        )))}
      />
    </MainContent>
  );
}

SettingView.propTypes = {
  ui: React.PropTypes.instanceOf(Map),
  data: React.PropTypes.instanceOf(Map).isRequired,
  handleUpdate: React.PropTypes.func.isRequired
};

export default SettingView;
