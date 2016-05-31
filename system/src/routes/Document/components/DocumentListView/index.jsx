import React from 'react';
import DocumentListContextMenuContainer from '../../containers/DocumentListContextMenuContainer';
import ListView from '../../../../common/views/list-view';

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
