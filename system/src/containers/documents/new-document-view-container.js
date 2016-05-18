/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import documentModule from '../../modules/documents';
import NewDocumentView from '../../components/documents/new-document-view';
import { baseMapStateToProps } from '../container-helpers';

class NewDocumentViewContainer extends Component {

  static propTypes = NewDocumentView.propTypes;

  render() {
    return React.createElement(NewDocumentView, this.props);
  }

}

function mapStateToProps(state) {
  return Object.assign({}, baseMapStateToProps(documentModule.entityUrl, 'newView', state), {
    listData: state[documentModule.entityUrl].getIn(['listView', 'data'])
  });
}

export default connect(mapStateToProps, {
  create: documentModule.create
})(NewDocumentViewContainer);
