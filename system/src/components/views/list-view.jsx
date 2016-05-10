/* global $ swal */
import React, { Component } from 'react';
import MainContent from '../common/main-content';
import EntityList from '../entity-list/entity-list';
import EntityListItem from '../entity-list/entity-list-item';
import { basePropTypes } from '../component-helpers';

class ListView extends Component {

  static propTypes = Object.assign({}, basePropTypes, {
    push: React.PropTypes.func.isRequired,
    listSearch: React.PropTypes.func.isRequired,
    setListFilter: React.PropTypes.func.isRequired,
    setPage: React.PropTypes.func.isRequired,
    toggleClosedDone: React.PropTypes.func.isRequired,
    showContextMenu: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSetListFilter = this.handleSetListFilter.bind(this);
    this.handleToggleClosedDone = this.handleToggleClosedDone.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  getContextMenu() {
    return null;
  }

  isLoading(ui) {
    return ui.get('loading');
  }

  handlePageChange(page) {
    this.props.setPage(page);
  }

  handleSearchInput(value) {
    this.props.listSearch(value);
  }

  handleSetListFilter(name, value) {
    this.props.setListFilter(name, value);
  }

  handleToggleClosedDone() {
    this.props.toggleClosedDone();
  }

  handleContextMenu(clientX, clientY, entity) {
    this.props.showContextMenu(clientX, clientY, entity);
  }

  handleNewItem() {
    this.props.push(`${this.props.entityConfig.get('url')}/new`);
  }

  handleEditItem(entity) {
    this.props.push(`${this.props.entityConfig.get('url')}/edit/${entity.get('_id')}`);
  }

  handleRemoveItem(entity) {
    // FIXME: duplicate code with list-context-menu.jsx
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!'
    }, () => {
      this.props.remove(entity.get('_id'));
    });
  }

  render() {
    const { entityConfig, ui, data } = this.props;

    // TODO: Use some design pattern
    const actions = ui.get('actions');
    const listActions = ui.get('listActions');
    const displayNewButton = actions.indexOf('new') !== -1;
    const displayExportButton = actions.indexOf('export') !== -1;
    const displayToggleButton = actions.indexOf('toggle') !== -1;
    const displayEditButton = listActions.indexOf('edit') !== -1;
    const displayDeleteButton = listActions.indexOf('delete') !== -1;

    return (
      <MainContent
        header={ui.get('title')}
        loading={this.isLoading(ui)}
        error={ui.get('error')}
      >
        <EntityList
          entityConfig={entityConfig}
          ui={ui}
          data={data}
          handlePageChange={this.handlePageChange}
          handleSearchInput={this.handleSearchInput}
          handleSetListFilter={this.handleSetListFilter}
          handleToggleClosedDone={displayToggleButton ? this.handleToggleClosedDone : null}
          handleNewItem={displayNewButton ? this.handleNewItem : null}
          displayExportButton={displayExportButton}
        >
          {data.get('entities').map(
            entity => (
              <EntityListItem
                key={entity.get(entityConfig.get('identity'))}
                fieldConfigs={entityConfig.get('fields').filter(field =>
                  field.get('type') !== 'hidden')}
                cssClass={ui.get('cssClass')}
                entity={entity}
                handleContextMenu={this.handleContextMenu}
                handleEditItem={displayEditButton ? this.handleEditItem : null}
                handleRemoveItem={displayDeleteButton ? this.handleRemoveItem : null}
              />
            )
          )}
        </EntityList>
        {this.getContextMenu()}
      </MainContent>
    );
  }

}

export default ListView;
