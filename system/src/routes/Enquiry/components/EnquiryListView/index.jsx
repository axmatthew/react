import React from 'react';
import EnquiryListContextMenuContainer from '../../containers/EnquiryListContextMenuContainer';
import ListView from '../../../../common/views/list-view';

class EnquiryListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <EnquiryListContextMenuContainer />;
  }

}

export default EnquiryListView;
