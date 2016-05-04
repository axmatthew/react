import React from 'react';
import CashFlowListContextMenuContainer from
  '../../containers/cash-flows/cash-flow-list-context-menu-container';
import ListView from '../views/list-view';

class CashFlowListView extends ListView {

  static propTypes = ListView.propTypes;

  getContextMenu() {
    return <CashFlowListContextMenuContainer />;
  }

}

export default CashFlowListView;
