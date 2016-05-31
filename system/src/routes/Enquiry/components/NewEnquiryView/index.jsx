/* global moment */
import React from 'react';
import { Map } from 'immutable';
import NewView from '../../../../common/views/new-view';

class NewEnquiryView extends NewView {

  static contextTypes = NewView.contextTypes;

  static propTypes = Object.assign({}, NewView.propTypes, {
    listData: React.PropTypes.instanceOf(Map).isRequired
  });

  getInitialValues() {
    const enquiryNumbers = this.props.listData.get('entities').map(entity => (
      entity.get('enquiryNum')
      ? Number(entity.get('enquiryNum').substring(4))
      : -1
    ));

    const maxNum = Math.max.apply(null, enquiryNumbers.toJS());
    const newEnquiryNum = `${moment().format('YYMM')}${maxNum + 1}`;

    return Map({
      sales: this.props.user.get('username'),
      enquiryNum: newEnquiryNum
    });
  }

}

export default NewEnquiryView;
