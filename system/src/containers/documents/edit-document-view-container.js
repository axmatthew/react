import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import documentModule from '../../modules/documents';
import EditDocumentView from '../../components/documents/edit-document-view';
import { baseMapStateToProps } from '../container-helpers';

class EditDocumentViewContainer extends Component {

  static propTypes = Object.assign({}, EditDocumentView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetch: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.params._id);
  }

  render() {
    return React.createElement(
      EditDocumentView,
      Object.assign({}, this.props, { fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, documentModule.entityUrl, 'editView'), {
  fetch: documentModule.fetch,

  // Transfer to presentation component
  update: documentModule.update
})(EditDocumentViewContainer);
