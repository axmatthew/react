import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import documentModule from '../../modules/documents';
import DocumentListView from '../../components/documents/document-list-view';
import { baseMapStateToProps } from '../container-helpers';

class DocumentListViewContainer extends Component {

  static propTypes = Object.assign({}, DocumentListView.propTypes, {
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
      this.props.fetchBy('username', username);
    }
  }

  componentWillReceiveProps(nextProps) {
    // only fetch data related to the user by default
    if (this.props.user !== nextProps.user) {
      const username = nextProps.user && nextProps.user.get('username');
      this.props.fetchBy('username', username);
    }

    // if ui.filters changed
    if (this.props.ui.get('filters') !== nextProps.ui.get('filters')) {
      const usernameFilter = nextProps.ui.get('filters')
        .find(filter => filter.get('name') === 'username');

      // if the sales filter is set to empty string, fetchAll
      if (usernameFilter) {
        if (!usernameFilter.get('value')) {
          this.props.fetchAll();
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.unlistenAll();
  }

  render() {
    return React.createElement(DocumentListView,
      Object.assign({}, this.props, { fetchAll: undefined }));
  }

}

export default connect(baseMapStateToProps.bind(null, documentModule.entityUrl, 'listView'), {
  fetchAll: documentModule.fetchAll,
  fetchBy: documentModule.fetchBy,
  unlistenAll: documentModule.unlistenAll,

  // Transfer to presentation component
  push,
  listSearch: documentModule.listSearch,
  setListFilter: documentModule.setListFilter,
  setPage: documentModule.setPage,
  toggleClosedDone: documentModule.toggleClosedDone,
  showContextMenu: documentModule.showContextMenu,
  remove: documentModule.remove
})(DocumentListViewContainer);
