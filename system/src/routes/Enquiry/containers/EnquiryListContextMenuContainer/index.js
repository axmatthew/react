/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import enquiryModule from '../../../../modules/enquiries';
import purchaseOrderModule from '../../../../modules/purchase-orders';
import documentModule from '../../../../modules/documents';
import EnquiryListContextMenu from '../../components/EnquiryListContextMenu';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class EnquiryListContextMenuContainer extends Component {

  static propTypes = EnquiryListContextMenu.propTypes;

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
  documentSetListFilter: documentModule.setListFilter,
  generateDocument: documentModule.generateDocument
})(EnquiryListContextMenuContainer);
