import DocumentListViewContainer from './containers/DocumentListViewContainer';
import NewDocumentViewContainer from './containers/NewDocumentViewContainer';
import EditDocumentViewContainer from './containers/EditDocumentViewContainer';

export default [
  { path: 'documents', component: DocumentListViewContainer },
  { path: 'documents/new', component: NewDocumentViewContainer },
  { path: 'documents/edit/:_id', component: EditDocumentViewContainer }
];
