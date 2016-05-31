import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../../../modules/enquiries';
import EnquiryListView from '../../components/EnquiryListView';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class EnquiryListViewContainer extends Component {

  static propTypes = Object.assign({}, EnquiryListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired
  });

  componentDidMount() {
    // fetchAll if no entities, and do not unlisten on unmount
    if (this.props.data.get('entities').size === 0) {
      this.props.fetchAll();
    }
  }

  componentWillReceiveProps(nextProps) {
    // fetch data after login
    if (this.props.user !== nextProps.user) {
      if (this.props.data.get('entities').size === 0) {
        this.props.fetchAll();
      }
    }
  }

  render() {
    return React.createElement(EnquiryListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, enquiryModule.entityUrl, 'listView'), {
  fetchAll: enquiryModule.fetchAll,

  // Transfer to presentation component
  push,
  listSearch: enquiryModule.listSearch,
  setListFilter: enquiryModule.setListFilter,
  setPage: enquiryModule.setPage,
  toggleClosedDone: enquiryModule.toggleClosedDone,
  showContextMenu: enquiryModule.showContextMenu,
  remove: enquiryModule.remove
})(EnquiryListViewContainer);
