import React, { Component } from 'react';
import { connect } from 'react-redux';
import enquiryModule from '../../../../modules/enquiries';
import EditEnquiryView from '../../components/EditEnquiryView';
import { baseMapStateToProps } from '../../../../common/container-helpers';

class EditEnquiryViewContainer extends Component {

  static propTypes = Object.assign({}, EditEnquiryView.propTypes, {
    params: React.PropTypes.object.isRequired,
    fetch: React.PropTypes.func.isRequired
  });

  componentDidMount() {
    this.props.fetch(this.props.params._id);
  }

  render() {
    return React.createElement(
      EditEnquiryView,
      Object.assign({}, this.props, { params: undefined, fetch: undefined })
    );
  }

}

export default connect(baseMapStateToProps.bind(null, enquiryModule.entityUrl, 'editView'), {
  fetch: enquiryModule.fetch,

  // Transfer to presentation component
  update: enquiryModule.update
})(EditEnquiryViewContainer);
