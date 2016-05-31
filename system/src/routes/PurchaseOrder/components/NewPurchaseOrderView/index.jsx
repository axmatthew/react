import { Map } from 'immutable';
import NewView from '../../../../common/views/new-view';

class NewPurchaseOrderView extends NewView {

  static propTypes = Object.assign({}, NewView.propTypes);

  getInitialValues() {
    const enquiry = this.props.data.get('enquiry');
    const duplicates = this.props.data.get('duplicates');

    // Still fetching (displaying loading screen)
    if (!(enquiry && duplicates)) { return null; }

    // Append count suffix to poNum
    let poNum = `P${enquiry.get('enquiryNum')}`;
    const count = duplicates.size;

    if (count > 0) {
      poNum += count + 1;
    }

    return Map({
      // FIXME: enquiryEntityConfig.get('identity')
      enquiryId: enquiry.get('_id'),
      poNum,
      sales: enquiry.get('sales'),
      companyName: enquiry.get('companyName'),
      contactPerson: enquiry.get('contactPerson'),
      tels: enquiry.get('tels'),
      emails: enquiry.get('emails')
    });
  }

  isLoading(ui) {
    return super.isLoading(ui) || ui.get('fetchingDuplicates');
  }

}

export default NewPurchaseOrderView;
