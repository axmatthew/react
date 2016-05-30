import React from 'react';
import ContextMenuItem from '../../common/components/context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class DocumentListContextMenu extends ListContextMenu {

  static propTypes = ListContextMenu.propTypes;

  constructor() {
    super();

    this.handleDownloadExcel = this.handleDownloadExcel.bind(this);
    this.handleDownloadPdf = this.handleDownloadPdf.bind(this);
    this.handleOpenGoogleSheets = this.handleOpenGoogleSheets.bind(this);
  }

  handleOpenGoogleSheets() {
    const entity = this.props.data.get('contextMenuEntity');
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/edit`, '_blank');
  }

  handleDownloadPdf() {
    const entity = this.props.data.get('contextMenuEntity');

    /*
    if (Quotation/Invoice/SalesConfirmation) {
      colCount = 7
      determine rowCount
      get gid
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/export?format=pdf&gridlines=0&portrait=1&fitw=1`, '_self');
    }
    */
    // google sheets can only set a specific boundary to print, cannot set bounded columns,
    // and it need the gid (sheet id) for it to work
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/export?format=pdf&gridlines=0&portrait=1&fitw=1`, '_self');
  }

  handleDownloadExcel() {
    const entity = this.props.data.get('contextMenuEntity');
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/export?format=xlsx`, '_self');
  }

  getContextMenuItems() {
    return [
      <ContextMenuItem
        key="Google Sheets"
        label="Google Sheets"
        onItemClick={this.handleOpenGoogleSheets}
      />,
      <ContextMenuItem key="PDF" label="PDF" onItemClick={this.handleDownloadPdf} />,
      <ContextMenuItem key="Excel" label="Excel" onItemClick={this.handleDownloadExcel} />
    ];
  }

}

export default DocumentListContextMenu;
