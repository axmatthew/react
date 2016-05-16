/* global $ moment swal */
import React from 'react';
import { Map } from 'immutable';
import ContextSubMenu from '../context-menu/context-sub-menu';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class PurchaseOrderListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    cashFlowEntityConfig: React.PropTypes.instanceOf(Map).isRequired,
    updateEnquiry: React.PropTypes.func.isRequired,
    createCashFlows: React.PropTypes.func.isRequired,
    cashFlowSetListFilter: React.PropTypes.func.isRequired,
    cashFlowListSearch: React.PropTypes.func.isRequired,

    // FIXME: duplicate code with EnquiryListContextMenu
    documentEntityConfig: React.PropTypes.instanceOf(Map).isRequired,
    documentListSearch: React.PropTypes.func.isRequired,
    documentSetListFilter: React.PropTypes.func.isRequired,
    generateDocument: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleViewCashFlows = this.handleViewCashFlows.bind(this);
    this.handleCreateCashFlows = this.handleCreateCashFlows.bind(this);

    // FIXME: duplicate code with EnquiryListContextMenu
    this.handleGenerateDocument = this.handleGenerateDocument.bind(this);
    this.handleOpenDocuments = this.handleOpenDocuments.bind(this);
  }

  /** Override to provide extra message in alert */
  handleRemoveItem() {
    const entity = this.props.data.get('contextMenuEntity');

    // FIXME: duplicate code with purchase-order-list-view.jsx
    swal({
      title: 'Are you sure?',
      text: 'Delete purchase order will not delete related cash flow records.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!'
    }, () => {
      this.props.remove(entity.get('_id'));
    });
  }

  handleStatusUpdate(newStatus) {
    const entity = this.props.data.get('contextMenuEntity');

    // ask if user want to also change the status of related enquiry
    if (newStatus === 'Done') {
      this.props.update(entity.get('_id'), {
        status: newStatus,
        finishDate: moment().format('YYYY-MM-DD')
      });

      swal({
        title: 'Optional',
        text: 'Do you want to also set the related enquiry to Done?',
        type: 'info',
        showCancelButton: true
      }, () => {
        this.props.updateEnquiry(entity.get('enquiryId'), { status: 'Done' });
      });
    } else if (newStatus === 'Closed') {
      this.props.update(entity.get('_id'), { status: newStatus });

      swal({
        title: 'Optional',
        text: 'Do you want to also set the related enquiry to Closed?',
        type: 'info',
        showCancelButton: true
      }, () => {
        this.props.updateEnquiry(entity.get('enquiryId'), { status: 'Closed' });
      });
    } else {
      this.props.update(entity.get('_id'), { status: newStatus });
    }
  }

  handleViewCashFlows() {
    const entity = this.props.data.get('contextMenuEntity');

    // Redirect to cash flow list view with search value as enqiuryNum
    // TODO: combine to clearFilterAndSearch?
    this.props.cashFlowSetListFilter('sales', '');
    this.props.cashFlowListSearch(entity.get('poNum').substring(1));
    this.props.push(this.props.cashFlowEntityConfig.get('url'));
  }

  handleCreateCashFlows() {
    const entity = this.props.data.get('contextMenuEntity');

    swal({
      title: 'Information',
      text: 'Create new cash flow records will not delete existing ones.',
      type: 'info',
      showCancelButton: true
    }, () => {
      this.props.createCashFlows(entity.get('_id'));
    });
  }

  // FIXME: duplicate code with EnquiryListContextMenu
  handleGenerateDocument(...args) {
    const entity = this.props.data.get('contextMenuEntity');
    const fakeEnquiry = entity.set('_id', entity.get('enquiryId'))
      .set('enquiryNum', entity.get('poNum').substring(1));
    this.props.generateDocument(fakeEnquiry, ...args);

    if (args[0] === 'Quotation') {
      swal({
        title: 'Optional',
        text: 'Do you want to set the enquiry status to Quoted?',
        type: 'info',
        showCancelButton: true
      }, () => {
        this.props.update(fakeEnquiry.get('_id'), { status: 'Quoted' });
      });
    }
  }

  // FIXME: duplicate code with EnquiryListContextMenu
  handleOpenDocuments() {
    const entity = this.props.data.get('contextMenuEntity');
    const fakeEnquiry = entity.set('_id', entity.get('enquiryId'))
      .set('enquiryNum', entity.get('poNum').substring(1));
    // Redirect to document list view with search value as enqiuryNum
    // TODO: combine to clearFilterAndSearch?
    this.props.documentSetListFilter('username', '');
    this.props.documentListSearch(fakeEnquiry.get('enquiryNum'));
    this.props.push(this.props.documentEntityConfig.get('url'));
  }

  getContextMenuItems() {
    const statusMenus = ['New', 'Sample', 'Manufacturing', 'Delivering', 'Done', 'Closed'];

    return [
      <ContextSubMenu key="Status" label="Status">
        {
          statusMenus.map(menu => (
            <ContextMenuItem
              key={menu}
              label={menu}
              onItemClick={() => this.handleStatusUpdate(menu)}
            />
          ))
        }
      </ContextSubMenu>,
      <ContextMenuItem
        key="View Cash Flows"
        label="View Cash Flows"
        onItemClick={this.handleViewCashFlows}
      />,
      <ContextMenuItem
        key="Create Cash Flows"
        label="Create Cash Flows"
        onItemClick={this.handleCreateCashFlows}
      />,

      // FIXME: duplicate code with EnquiryListContextMenu
      <ContextSubMenu key="Documents" label="Documents">
        <ContextMenuItem
          label="Quotation"
          onItemClick={() => this.handleGenerateDocument('Quotation', 'Q')}
        />
        <ContextMenuItem
          label="English Quotation"
          onItemClick={() => this.handleGenerateDocument('EQuotation', 'Q')}
        />
        <ContextMenuItem
          label="Sales Confirmation"
          onItemClick={() => this.handleGenerateDocument('SalesConfirmation', 'S')}
        />
        <ContextMenuItem
          label="Deposit Invoice"
          onItemClick={() => this.handleGenerateDocument('Invoice', 'I', 'A')}
        />
        <ContextMenuItem
          label="Remaining Invoice"
          onItemClick={() => this.handleGenerateDocument('Invoice', 'I', 'B')}
        />
      </ContextSubMenu>,
      <ContextMenuItem
        key="Open Documents"
        label="Open Documents"
        onItemClick={this.handleOpenDocuments}
      />
    ];
  }

}

export default PurchaseOrderListContextMenu;
