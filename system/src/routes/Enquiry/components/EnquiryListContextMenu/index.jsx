/* global swal */
import React from 'react';
import { Map } from 'immutable';
import ContextSubMenu from '../../../../common/components/ContextSubMenu';
import ContextMenuItem from '../../../../common/components/ContextMenuItem';
import ListContextMenu from '../../../../common/views/list-context-menu';

class EnquiryListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    poEntityConfig: React.PropTypes.instanceOf(Map).isRequired,
    documentEntityConfig: React.PropTypes.instanceOf(Map).isRequired,
    documentListSearch: React.PropTypes.func.isRequired,
    documentSetListFilter: React.PropTypes.func.isRequired,
    generateDocument: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleGenerateDocument = this.handleGenerateDocument.bind(this);
    this.handleGenerateReceipt = this.handleGenerateReceipt.bind(this);
    this.handleGenerateDeliveryNote = this.handleGenerateDeliveryNote.bind(this);
    this.handleOpenDocuments = this.handleOpenDocuments.bind(this);
    this.handleNewPurchaseOrder = this.handleNewPurchaseOrder.bind(this);
  }

  handleStatusUpdate(newStatus) {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.update(entity.get('_id'), { status: newStatus });
  }

  handleGenerateDocument(...args) {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.generateDocument(entity, ...args);

    if (args[0] === 'Quotation') {
      swal({
        title: 'Optional',
        text: 'Do you want to set the enquiry status to Quoted?',
        type: 'info',
        showCancelButton: true
      }, () => {
        this.props.update(entity.get('_id'), { status: 'Quoted' });
      });
    }
  }

  handleGenerateReceipt() {
    swal({
      title: '',
      text: 'Amount (Arabic number, no comma)',
      type: 'input',
      showCancelButton: true,
      animation: 'slide-from-top',
      inputPlaceholder: ''
    }, amount => {
      const entity = this.props.data.get('contextMenuEntity');

      if (amount) {
        this.props.generateDocument(entity, 'Receipt', 'R', null, [amount]);
      }
    });
  }

  handleGenerateDeliveryNote() {
    swal({
      title: '',
      text: 'format: 荃灣海盛路3號TML廣場7樓C5-B室,2014-08-15,防水袋,16200,頭巾,16200',
      type: 'input',
      showCancelButton: true,
      animation: 'slide-from-top',
      inputPlaceholder: '荃灣海盛路3號TML廣場7樓C5-B室,2014-08-15,防水袋,16200,頭巾,16200'
    }, details => {
      const entity = this.props.data.get('contextMenuEntity');

      if (details) {
        this.props.generateDocument(entity, 'DeliveryNote', 'DN', null, [details]);
      }
    });
  }

  handleOpenDocuments() {
    const entity = this.props.data.get('contextMenuEntity');
    // Redirect to document list view with search value as enqiuryNum
    // TODO: combine to clearFilterAndSearch?
    this.props.documentSetListFilter('username', '');
    this.props.documentListSearch(entity.get('enquiryNum'));
    this.props.push(this.props.documentEntityConfig.get('url'));
  }

  handleNewPurchaseOrder() {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.push(`${this.props.poEntityConfig.get('url')}/new/${entity.get('_id')}`);
  }

  getContextMenuItems() {
    const statusMenus = ['New', 'Quoted', 'Active', 'NotActive', 'Signed', 'Done', 'Closed'];

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
        <ContextMenuItem label="Receipt" onItemClick={this.handleGenerateReceipt} />
        <ContextMenuItem label="Delivery Note" onItemClick={this.handleGenerateDeliveryNote} />
      </ContextSubMenu>,
      <ContextMenuItem
        key="Open Documents"
        label="Open Documents"
        onItemClick={this.handleOpenDocuments}
      />,
      <ContextMenuItem key="New PO" label="New PO" onItemClick={this.handleNewPurchaseOrder} />
    ];
  }

}

export default EnquiryListContextMenu;
