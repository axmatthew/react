import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import enquiryModule from '../../modules/enquiries';
import NewEnquiryView from '../../components/enquiries/new-enquiry-view';
import { baseMapStateToProps } from '../container-helpers';

class NewEnquiryViewContainer extends Component {

  static propTypes = Object.assign({}, NewEnquiryView.propTypes, {
    push: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    // Ensure entities exists
    const entities = this.props.listData.get('entities');

    if (entities.size === 0) {
      // Go back to list view if entities not fetched yet
      // TODO: better mechanism to get new enquiryNum,
      // e.g. fetchAll if entities not exists
      this.props.push(this.props.entityConfig.get('url'));
    }
  }

  render() {
    return React.createElement(NewEnquiryView, Object.assign({}, this.props, {
      push: undefined
    }));
  }

}

function mapStateToProps(state) {
  return Object.assign({}, baseMapStateToProps(enquiryModule.entityUrl, 'newView', state), {
    listData: state[enquiryModule.entityUrl].getIn(['listView', 'data'])
  });
}

export default connect(mapStateToProps, {
  push,

  // Transfer to presentation component
  create: enquiryModule.create
})(NewEnquiryViewContainer);
