import React from 'react';
import { Map } from 'immutable';
import DataTable from '../DataTable';

function EntityList(props) {
  const { entityConfig, ui, data, ...others } = props;

  return (
    <DataTable
      fieldConfigs={entityConfig.get('fields').filter(field => field.get('type') !== 'hidden')}
      order={ui.get('order')}
      page={ui.get('page')}
      search={ui.get('search')}
      filters={ui.get('filters')}
      displayClosedDone={ui.get('displayClosedDone')}
      cssClass={ui.get('cssClass')}
      entities={data.get('entities')}
      {...others}
    >
      {props.children}
    </DataTable>
  );
}

EntityList.propTypes = {
  entityConfig: React.PropTypes.instanceOf(Map).isRequired,
  ui: React.PropTypes.instanceOf(Map).isRequired,
  data: React.PropTypes.instanceOf(Map).isRequired,

  // Transfer to DataTable
  handleNewItem: React.PropTypes.func,
  displayExportButton: React.PropTypes.bool.isRequired,
  handlePageChange: React.PropTypes.func.isRequired,
  handleSearchInput: React.PropTypes.func.isRequired,
  handleSetListFilter: React.PropTypes.func.isRequired,
  handleToggleClosedDone: React.PropTypes.func
};

export default EntityList;
