import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../modules/enquiries';
import purchaseOrderModule from '../../modules/purchase-orders';
import documentModule from '../../modules/documents';
import EnquiryListContextMenu from '../../components/enquiries/enquiry-list-context-menu';
import { baseMapStateToProps } from '../container-helpers';

class EnquiryListContextMenuContainer extends Component {

  static propTypes = EnquiryListContextMenu.propTypes;

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return React.createElement(EnquiryListContextMenu, this.props);
  }

}

function mapStateToProps(state) {
  return Object.assign({}, baseMapStateToProps(enquiryModule.entityUrl, 'listView', state), {
    poEntityConfig: state[purchaseOrderModule.entityUrl].get('entityConfig'),
    documentEntityConfig: state[documentModule.entityUrl].get('entityConfig')
  });
}

export default connect(mapStateToProps, {
  push,
  hideContextMenu: enquiryModule.hideContextMenu,
  update: enquiryModule.update,
  remove: enquiryModule.remove,
  documentListSearch: documentModule.listSearch,
  generateDocument: documentModule.generateDocument
})(EnquiryListContextMenuContainer);
