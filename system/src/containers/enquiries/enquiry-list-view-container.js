import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../modules/enquiries';
import EnquiryListView from '../../components/enquiries/enquiry-list-view';
import { baseMapStateToProps } from '../container-helpers';

class EnquiryListViewContainer extends Component {

  static propTypes = Object.assign({}, EnquiryListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
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
