import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import enquiryModule from '../../modules/enquiries';
import HeaderDropdown from '../../components/header/header-dropdown';

class HeaderDropdownContainer extends Component {

  static propTypes = {
    enquiries: React.PropTypes.instanceOf(Map).isRequired
  };

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return React.createElement(HeaderDropdown, {
      newEnquiries: this.props.enquiries.filter(enquiry => enquiry.get('status') === 'New')
    });
  }

}

function mapStateToProps(state) {
  return { enquiries: state[enquiryModule.entityUrl].getIn(['listView', 'data', 'entities']) };
}

export default connect(mapStateToProps)(HeaderDropdownContainer);
