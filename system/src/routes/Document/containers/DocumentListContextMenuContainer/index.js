/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import documentModule from '../../../../modules/documents';
import DocumentListContextMenu from '../../components/DocumentListContextMenu';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class DocumentListContextMenuContainer extends Component {

  static propTypes = DocumentListContextMenu.propTypes;

  render() {
    return React.createElement(DocumentListContextMenu, this.props);
  }

}

export default connect(baseMapStateToProps.bind(null, documentModule.entityUrl, 'listView'), {
  push,
  hideContextMenu: documentModule.hideContextMenu,
  update: documentModule.update,
  remove: documentModule.remove,
})(DocumentListContextMenuContainer);
