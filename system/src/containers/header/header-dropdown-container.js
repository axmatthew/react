import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import enquiryModule from '../../modules/enquiries';
import HeaderDropdown from '../../components/header/header-dropdown';

class HeaderDropdownContainer extends Component {

  static propTypes = {
    user: React.PropTypes.instanceOf(Map),
    enquiries: React.PropTypes.instanceOf(List).isRequired
  };

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { user, enquiries } = this.props;

    return React.createElement(HeaderDropdown, {
      newEnquiries: user
        ? enquiries.filter(enquiry => (
          enquiry.get('status') === 'New' &&
          enquiry.get('sales') === user.get('username')
        ))
        : List()
    });
  }

}

function mapStateToProps(state) {
  return {
    user: state.users.getIn(['data', 'user']),
    enquiries: state[enquiryModule.entityUrl].getIn(['listView', 'data', 'entities'])
  };
}

export default connect(mapStateToProps)(HeaderDropdownContainer);
