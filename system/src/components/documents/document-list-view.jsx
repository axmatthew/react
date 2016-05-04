import React from 'react';
import DocumentListContextMenuContainer from
  '../../containers/documents/document-list-context-menu-container';
import ListView from '../views/list-view';

class DocumentListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <DocumentListContextMenuContainer />;
  }

}

export default DocumentListView;
