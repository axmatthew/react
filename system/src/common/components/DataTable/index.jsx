import React, { Component } from 'react';
import { List } from 'immutable';
import DataTableToolbar from './data-table-toolbar';
import DataTableToolbarButton from './data-table-toolbar-button';
import './style.css';

class DataTable extends Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    // List<{ name, value }>
    fieldConfigs: React.PropTypes.instanceOf(List).isRequired,
    order: React.PropTypes.instanceOf(List).isRequired,
    page: React.PropTypes.number.isRequired,
    search: React.PropTypes.string.isRequired,
    filters: React.PropTypes.instanceOf(List).isRequired,
    displayClosedDone: React.PropTypes.bool.isRequired,
    entities: React.PropTypes.instanceOf(List).isRequired,
    handleNewItem: React.PropTypes.func,
    displayExportButton: React.PropTypes.bool.isRequired,
    handlePageChange: React.PropTypes.func.isRequired,
    handleSearchInput: React.PropTypes.func.isRequired,
    handleSetListFilter: React.PropTypes.func.isRequired,
    handleToggleClosedDone: React.PropTypes.func
  };

  constructor() {
    super();

    this.handleExportCsv = this.handleExportCsv.bind(this);
  }

  componentDidMount() {
    this.renderTable();
    this.filterTable();
  }

  componentWillUpdate(nextProps) {
    // Destroy the datatable first to prevent re-initialize
    if (
      this.props.entities !== nextProps.entities ||
      this.props.filters !== nextProps.filters
    ) {
      $('#datatable1').dataTable().api().destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.entities !== prevProps.entities ||
      this.props.filters !== prevProps.filters
    ) {
      this.renderTable();
    }

    this.filterTable();
  }

  componentWillUnmount() {
    $('#datatable1').dataTable().api().destroy();
  }

  handleExportCsv() {
    const tableElt = $('#datatable1');
    exportTableToCsv(tableElt);
  }

  // Global search
  searchTableWithoutDraw(value) {
    $('#datatable1').dataTable().api().search(value);
  }

  // Column filter
  filterTableWithoutDraw(name, value) {
    $('#datatable1').dataTable().api().column(`${name}:name`).search(value, true, false);
  }

  filterTable() {
    // Toggle status = Closed / Done based on props
    const statusFilter = this.props.filters.find(filter => filter.get('name') === 'status');

    // Toggle Closed / Done only if status filter is not set
    if (!(statusFilter && statusFilter.get('value'))) {
      if (this.props.displayClosedDone) {
        this.filterTableWithoutDraw('status', '');
      } else {
        this.filterTableWithoutDraw('status', '^((?!Done|Closed).)*$');
      }
    }

    // Do global search
    this.searchTableWithoutDraw(this.props.search);

    // Set page
    $('#datatable1').dataTable().api().page(this.props.page).draw('page');
  }

  renderTable() {
    // Initialize the datatable
    $('#datatable1').dataTable({
      lengthMenu: [50, 100, 200],
      pageLength: 100,
      order: this.props.order.toJS(),
      columns: this.props.fieldConfigs.map(field => ({ name: field.get('name') }))
        .push({ name: 'actions' }).toJS(),
      initComplete: () => {
        // Setup the footer select filters
        // https://datatables.net/examples/api/multi_filter_select.html
        this.props.filters.forEach(filter => {
          const name = filter.get('name');
          const value = filter.get('value');
          const column = $('#datatable1').dataTable().api().column(`${name}:name`);
          const footer = $(column.footer());
          const handleSetListFilter = this.props.handleSetListFilter;

          const select = $('<select><option value=""></option></select>')
            .appendTo(footer.empty())
            .on('change', function onChange() {
              const val = $.fn.dataTable.util.escapeRegex($(this).val());
              handleSetListFilter(name, val);
            });

          column.data().unique().sort().each(val => {
            // Create filter options and set the default value
            const selected = value && value.toLowerCase() === val.toLowerCase()
              ? ' selected' : '';
            select.append(`<option value="${val}"${selected}>${val}</option>`);

            // Do filter
            if (selected) {
              // do not draw the table yet
              column.search(val, true, false);
            }
          });
        });

        // draw the table
        $('#datatable1').dataTable().api().draw();
      }
    }).on('page.dt', () => {
      const page = $('#datatable1').dataTable().api().page();
      this.props.handlePageChange(page);
    });
  }

  render() {
    return (
      <span>
        <DataTableToolbar
          search={this.props.search}
          handleSearchInput={this.props.handleSearchInput}
        >
          {
            this.props.handleNewItem
            ? <DataTableToolbarButton
              faClassName="fa-plus"
              label="New Item"
              onButtonClick={this.props.handleNewItem}
            />
            : null
          }
          {
            this.props.displayExportButton
            ? <DataTableToolbarButton
              faClassName="fa-download"
              label="Export"
              onButtonClick={this.handleExportCsv}
            />
            : null
          }
          {
            this.props.handleToggleClosedDone
            ? <DataTableToolbarButton
              faClassName="fa-toggle-on"
              label="Toggle Closed/Done"
              onButtonClick={this.props.handleToggleClosedDone}
            />
            : null
          }
        </DataTableToolbar>
        <table id="datatable1" className="table table-condensed table-hover">
          <thead>
            <tr>
              {this.props.fieldConfigs.map(field => (
                <th key={field.get('name')}>{field.get('label')}</th>
              ))}
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              {this.props.fieldConfigs.map(field => (
                <td key={field.get('name')} />
              ))}
              <td className="text-center"></td>
            </tr>
          </tfoot>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </span>
    );
  }

}

export default DataTable;

function exportTableToCsv(tableElt) {
  // https://github.com/kayalshri/tableExport.jquery.plugin
  const settings = {
    separator: ',',
    ignoreColumn: []
  };

  // Header
  let tdData = '';
  tableElt.find('thead').find('tr').each(function each() {
    // TODO: handle .filter(':visible')
    $(this).find('th').each(function eachTh(index) {
      if ($(this).css('display') !== 'none') {
        if (settings.ignoreColumn.indexOf(index) === -1) {
          tdData += `"${$(this).text().trim()}"${settings.separator}`;
        }
      }
    });

    tdData = `${tdData.substring(0, tdData.length - 1)}\n`;
  });

  // Row vs Column
  tableElt.find('tbody').find('tr').each(function each() {
    $(this).find('th,td').each(function eacg(index) {
      // TODO: handle .filter(':visible')
      if ($(this).css('display') !== 'none') {
        if (settings.ignoreColumn.indexOf(index) === -1) {
          tdData += `"${$(this).text().trim()}"${settings.separator}`;
        }
      }
    });

    tdData = `${tdData.substring(0, tdData.length - 1)}\n`;
  });

  // Custom code - set filename
  const link = document.createElement('a');
  link.href = `data:application/octet-stream,${encodeURIComponent(tdData)}`;
  link.style = 'visibility:hidden';
  link.download = 'data.csv';

  // this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
