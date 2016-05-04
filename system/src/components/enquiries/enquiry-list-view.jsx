import React from 'react';
import EnquiryListContextMenuContainer from
  '../../containers/enquiries/enquiry-list-context-menu-container';
import ListView from '../views/list-view';

class EnquiryListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <EnquiryListContextMenuContainer />;
  }

}

export default EnquiryListView;
