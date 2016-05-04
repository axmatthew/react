import React from 'react';
import ContextMenuItem from '../context-menu/context-menu-item';
import ListContextMenu from '../views/list-context-menu';

class DocumentListContextMenu extends ListContextMenu {

  static propTypes = ListContextMenu.propTypes;

  constructor() {
    super();

    this.handleDownloadExcel = this.handleDownloadExcel.bind(this);
    this.handleDownloadPdf = this.handleDownloadPdf.bind(this);
    this.handleOpenGoogleSheets = this.handleOpenGoogleSheets.bind(this);
  }

  handleDownloadExcel() {
    const entity = this.props.data.get('contextMenuEntity');
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/export?format=xlsx`, '_self');
  }

  handleDownloadPdf() {
    const entity = this.props.data.get('contextMenuEntity');
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/export?format=pdf&gridlines=0&portrait=1&fitw=1`, '_self');
  }

  handleOpenGoogleSheets() {
    const entity = this.props.data.get('contextMenuEntity');
    window.open(`https://docs.google.com/spreadsheets/d/\
${entity.get('gSheetId')}/edit`, '_blank');
  }

  getContextMenuItems() {
    return [
      <ContextMenuItem key="Excel" label="Excel" onItemClick={this.handleDownloadExcel} />,
      <ContextMenuItem key="PDF" label="PDF" onItemClick={this.handleDownloadPdf} />,
      <ContextMenuItem
        key="Google Sheets"
        label="Google Sheets"
        onItemClick={this.handleOpenGoogleSheets}
      />
    ];
  }

}

export default DocumentListContextMenu;
