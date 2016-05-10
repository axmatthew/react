import React from 'react';
import DocumentListContextMenuContainer from
  '../../containers/documents/document-list-context-menu-container';
import ListView from '../views/list-view';

class DocumentListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <DocumentListContextMenuContainer />;
  }

  isLoading(ui) {
    return super.isLoading(ui) || ui.get('generating');
  }

}

export default DocumentListView;
