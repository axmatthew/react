/* global $ swal */
import React from 'react';
import { Map } from 'immutable';
import ContextSubMenu from '../context-menu/context-sub-menu';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class EnquiryListContextMenu extends ListContextMenu {

  static propTypes = Object.assign({}, ListContextMenu.propTypes, {
    poEntityConfig: React.PropTypes.instanceOf(Map).isRequired,
    generateDocument: React.PropTypes.func.isRequired
  });

  constructor() {
    super();

    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleGenerateDocument = this.handleGenerateDocument.bind(this);
    this.handleGenerateReceipt = this.handleGenerateReceipt.bind(this);
    this.handleGenerateDeliveryNote = this.handleGenerateDeliveryNote.bind(this);
    this.handleNewPurchaseOrder = this.handleNewPurchaseOrder.bind(this);
  }

  handleStatusUpdate(newStatus) {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.update(entity.get('_id'), { status: newStatus });
  }

  handleGenerateDocument(...args) {
    const entity = this.props.data.get('contextMenuEntity');
    this.props.generateDocument(entity, ...args);
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
      <ContextMenuItem key="New PO" label="New PO" onItemClick={this.handleNewPurchaseOrder} />
    ];
  }

}

export default EnquiryListContextMenu;
