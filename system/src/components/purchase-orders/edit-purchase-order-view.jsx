/* global $ swal */
import EditView from '../views/edit-view';

class EditPurchaseOrderView extends EditView {

  static propTypes = EditView.propTypes;

  /** Override to provide extra message before update */
  handleSubmit(fields) {
    swal({
      title: 'Information',
      text: 'Update purchase order will not update related cash flow records.',
      type: 'info',
      showCancelButton: true
    }, () => {
      this.props.update(this.props.params._id, fields, this.props.entityConfig.get('url'));
    });
  }

}

export default EditPurchaseOrderView;
