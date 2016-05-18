import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import enquiryModule from '../../modules/enquiries';
import EditEnquiryView from '../../components/enquiries/edit-enquiry-view';
import { baseMapStateToProps } from '../container-helpers';

class EditEnquiryViewContainer extends Component {

  static propTypes = Object.assign({}, EditEnquiryView.propTypes, {
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
      EditEnquiryView,
      Object.assign({}, this.props, { fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, enquiryModule.entityUrl, 'editView'), {
  fetch: enquiryModule.fetch,

  // Transfer to presentation component
  update: enquiryModule.update
})(EditEnquiryViewContainer);
