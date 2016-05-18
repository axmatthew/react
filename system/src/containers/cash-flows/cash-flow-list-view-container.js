import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cashFlowModule from '../../modules/cash-flows';
import CashFlowListView from '../../components/cash-flows/cash-flow-list-view';
import { baseMapStateToProps } from '../container-helpers';

class CashFlowListViewContainer extends Component {

  static propTypes = Object.assign({}, CashFlowListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired
  });

  // FIXME: duplicate code with EnquiryListViewContainer
  componentDidMount() {
    // fetchAll if no entities, and do not unlisten on unmount
    if (this.props.data.get('entities').size === 0) {
      this.props.fetchAll();
    }
  }

  // FIXME: duplicate code with EnquiryListViewContainer
  componentWillReceiveProps(nextProps) {
    // fetch data after login
    if (this.props.user !== nextProps.user) {
      if (this.props.data.get('entities').size === 0) {
        this.props.fetchAll();
      }
    }
  }

  render() {
    return React.createElement(CashFlowListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, cashFlowModule.entityUrl, 'listView'), {
  fetchAll: cashFlowModule.fetchAll,

  // Transfer to presentation component
  push,
  listSearch: cashFlowModule.listSearch,
  setListFilter: cashFlowModule.setListFilter,
  setPage: cashFlowModule.setPage,
  toggleClosedDone: cashFlowModule.toggleClosedDone,
  showContextMenu: cashFlowModule.showContextMenu,
  remove: cashFlowModule.remove
})(CashFlowListViewContainer);
