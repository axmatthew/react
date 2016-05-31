import React from 'react';
import CashFlowListContextMenuContainer from '../../containers/CashFlowListContextMenuContainer';
import ListView from '../../../../common/views/list-view';

class CashFlowListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <CashFlowListContextMenuContainer />;
  }

}

export default CashFlowListView;
