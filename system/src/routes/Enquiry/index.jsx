import EnquiryListViewContainer from './containers/EnquiryListViewContainer';
import NewEnquiryViewContainer from './containers/NewEnquiryViewContainer';
import EditEnquiryViewContainer from './containers/EditEnquiryViewContainer';

export default [
  { path: 'enquiries', component: EnquiryListViewContainer },
  { path: 'enquiries/new', component: NewEnquiryViewContainer },
  { path: 'enquiries/edit/:_id', component: EditEnquiryViewContainer }
];
