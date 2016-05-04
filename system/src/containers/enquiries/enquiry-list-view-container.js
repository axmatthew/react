import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../modules/enquiries';
import EnquiryListView from '../../components/enquiries/enquiry-list-view';
import { baseMapStateToProps } from '../container-helpers';

class EnquiryListViewContainer extends Component {

  static propTypes = Object.assign({}, EnquiryListView.propTypes, {
    fetchAll: React.PropTypes.func.isRequired,
    fetchBy: React.PropTypes.func.isRequired,
    unlistenAll: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    // user already set, i.e. from navigating
    const username = this.props.user && this.props.user.get('username');

    if (username) {
      this.props.fetchBy('sales', username);
    }
  }

  componentWillReceiveProps(nextProps) {
    // only fetch data related to the user by default
    if (this.props.user !== nextProps.user) {
      const username = nextProps.user && nextProps.user.get('username');
      this.props.fetchBy('sales', username);
    }

    // if ui.filters changed
    if (this.props.ui.get('filters') !== nextProps.ui.get('filters')) {
      const salesFilter = nextProps.ui.get('filters')
        .find(filter => filter.get('name') === 'sales');

      // if the sales filter is set to empty string, fetchAll
      if (salesFilter) {
        if (!salesFilter.get('value')) {
          this.props.fetchAll();
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.unlistenAll();
  }

  render() {
    return React.createElement(EnquiryListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, enquiryModule.entityUrl, 'listView'), {
  fetchAll: enquiryModule.fetchAll,
  fetchBy: enquiryModule.fetchBy,
  unlistenAll: enquiryModule.unlistenAll,

  // Transfer to presentation component
  push,
  listSearch: enquiryModule.listSearch,
  setListFilter: enquiryModule.setListFilter,
  setPage: enquiryModule.setPage,
  toggleClosedDone: enquiryModule.toggleClosedDone,
  showContextMenu: enquiryModule.showContextMenu,
  remove: enquiryModule.remove
})(EnquiryListViewContainer);
