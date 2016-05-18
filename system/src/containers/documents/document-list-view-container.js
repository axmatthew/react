import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import documentModule from '../../modules/documents';
import DocumentListView from '../../components/documents/document-list-view';
import { baseMapStateToProps } from '../container-helpers';

class DocumentListViewContainer extends Component {

  static propTypes = Object.assign({}, DocumentListView.propTypes, {
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
    return React.createElement(DocumentListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, documentModule.entityUrl, 'listView'), {
  fetchAll: documentModule.fetchAll,

  // Transfer to presentation component
  push,
  listSearch: documentModule.listSearch,
  setListFilter: documentModule.setListFilter,
  setPage: documentModule.setPage,
  toggleClosedDone: documentModule.toggleClosedDone,
  showContextMenu: documentModule.showContextMenu,
  remove: documentModule.remove
})(DocumentListViewContainer);
