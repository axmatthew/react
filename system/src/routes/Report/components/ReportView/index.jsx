/* global google */
import React, { Component } from 'react';
import { List, Map } from 'immutable';
import MainContent from '../../../../common/components/MainContent';
import Panel from '../../../../common/components/Panel';

class ReportView extends Component {

  static propTypes = {
    settings: React.PropTypes.instanceOf(Map),
    user: React.PropTypes.instanceOf(Map),
    enquiryListUi: React.PropTypes.instanceOf(Map).isRequired,
    purchaseOrderListUi: React.PropTypes.instanceOf(Map).isRequired,
    enquiries: React.PropTypes.instanceOf(List).isRequired,
    purchaseOrders: React.PropTypes.instanceOf(List).isRequired
  };

  componentWillMount() {
    if (this.props.enquiries.size > 0 && this.props.purchaseOrders.size > 0) {
      this.drawAllReports();
    }
  }

  componentDidUpdate() {
    if (this.props.enquiries.size > 0 && this.props.purchaseOrders.size > 0) {
      this.drawAllReports();
    }
  }

  drawAllReports() {
    const drawMethods = [
      () => this.drawSalesReportByStaff('sales-report-by-staff-container', po =>
        Number(po.get('signDate').split('-')[0]) === new Date().getFullYear() &&
        Number(po.get('signDate').split('-')[1]) === new Date().getMonth() + 1),
      () => this.drawSalesReportByStaff('sales-report-by-staff-last-month-container', po =>
        Number(po.get('signDate').split('-')[0]) === new Date().getFullYear() &&
        Number(po.get('signDate').split('-')[1]) === new Date().getMonth(), 'Last month'),
      () => this.drawSalesReportByMonth('sales-report-by-month-container'),
      () => this.drawEnquiryReportByStaff('enquiry-report-by-staff-container'),
      () => this.drawEnquiryReportByMonth('enquiry-report-by-month-container')
    ];

    // draw the graphs one by one otherwise google charts do not work
    const DRAW_INTERVAL_MS = 600;
    const timer = window.setInterval(() => {
      const method = drawMethods.shift();

      if (method) {
        method();
      } else {
        window.clearInterval(timer);
      }
    }, DRAW_INTERVAL_MS);
  }

  drawEnquiryReportByStaff(containerId, filter = () => true, subTitle = 'All time') {
    const filtered = this.props.enquiries.filter(filter);
    const data = [['Staff', 'New', 'Quoted', 'Active']];
    const sales = [...new Set(filtered.map(enquiry => enquiry.get('sales')).toJS())];

    sales.forEach(name => {
      data.push([
        name,
        filtered.filter(enquiry =>
          enquiry.get('sales') === name && enquiry.get('status') === 'New').size,
        filtered.filter(enquiry =>
          enquiry.get('sales') === name && enquiry.get('status') === 'Quoted').size,
        filtered.filter(enquiry =>
          enquiry.get('sales') === name && enquiry.get('status') === 'Active').size
      ]);
    });

    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
      chart: {
        title: 'Enquiry Report by Staff',
        subtitle: subTitle
      },
      colors: ['#e0e0e0', '#ffeb3b', '#e57373']
    };

    const chart = new google.charts.Bar(document.getElementById(containerId));

    chart.draw(dataTable, options);
  }

  drawEnquiryReportByMonth(containerId) {
    const filtered = this.props.enquiries.filter(enquiry =>
      Number(enquiry.get('date').split('-')[0]) === new Date().getFullYear());
    const data = [['Month', 'Count']];
    const months = [...new Set(filtered.map(enquiry => enquiry.get('date').split('-')[1]))].sort();

    months.forEach(month => {
      data.push([
        month,
        filtered.filter(enquiry => enquiry.get('date').split('-')[1] === month).size
      ]);
    });

    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
      chart: {
        title: 'Enquiry Report by Month'
      }
    };

    const chart = new google.charts.Bar(document.getElementById(containerId));

    chart.draw(dataTable, options);
  }

  drawSalesReportByStaff(containerId, filter, subTitle = 'This month') {
    const filtered = this.props.purchaseOrders.filter(filter);
    const data = [['Staff', 'G.P.']];
    const salesGps = {};
    filtered.forEach(po => {
      const sales = po.get('sales');

      if (sales) {
        if (salesGps[sales]) {
          salesGps[sales] += this.calculateGp(po.toJS());
        } else {
          salesGps[sales] = this.calculateGp(po.toJS());
        }
      }
    });

    Object.keys(salesGps).forEach(sales => {
      data.push([sales, salesGps[sales]]);
    });

    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
      chart: {
        title: 'Sales Report by Staff',
        subtitle: subTitle
      }
    };

    const chart = new google.charts.Bar(document.getElementById(containerId));

    chart.draw(dataTable, options);
  }

  drawSalesReportByMonth(containerId) {
    const filtered = this.props.purchaseOrders.filter(po =>
      Number(po.get('signDate').split('-')[0]) === new Date().getFullYear());
    const data = [['Month', 'G.P.']];
    const monthGps = {};
    filtered.forEach(po => {
      const signDate = po.get('signDate');

      if (signDate) {
        if (monthGps[signDate.split('-')[1]]) {
          monthGps[signDate.split('-')[1]] += this.calculateGp(po.toJS());
        } else {
          monthGps[signDate.split('-')[1]] = this.calculateGp(po.toJS());
        }
      }
    });

    Object.keys(monthGps).sort().forEach(month => {
      data.push([month, monthGps[month]]);
    });

    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
      chart: {
        title: 'Sales Report by Month'
      }
    };

    const chart = new google.charts.Bar(document.getElementById(containerId));

    chart.draw(dataTable, options);
  }

  // FIXME: duplicate code with modules/purchase-orders.jsx
  calculateGp(purchaseOrder) {
    const EX_HKD_RMB = this.props.settings.get('exchangeRate');
    const totalPrice = purchaseOrder.price * purchaseOrder.amount;
    const totalCost = purchaseOrder.cost *
      (purchaseOrder.amount + (purchaseOrder.spareAmount || 0)) +
      (purchaseOrder.otherCost || 0) + (purchaseOrder.logisticsCost || 0);
    const gp = totalPrice - totalCost / EX_HKD_RMB;

    return gp || 0;
  }

  render() {
    const { enquiryListUi, purchaseOrderListUi } = this.props;

    return (
      <MainContent
        header="Reports"
        loading={enquiryListUi.get('loading') || purchaseOrderListUi.get('loading')}
        error={enquiryListUi.get('error') || purchaseOrderListUi.get('error')}
      >
        <Panel header="Sales Reports" type="info">
          <div className="row">
            <div className="col-md-6">
              <div id="sales-report-by-staff-container" style={{ height: 300 }} />
            </div>
            <div className="col-md-6">
              <div id="sales-report-by-staff-last-month-container" style={{ height: 300 }} />
            </div>
            <div className="col-md-6">
              <div id="sales-report-by-month-container" style={{ height: 300 }} />
            </div>
          </div>
        </Panel>
        <Panel header="Enquiry Reports" type="success">
          <div className="row">
            <div className="col-md-6">
              <div id="enquiry-report-by-staff-container" style={{ height: 300 }} />
            </div>
            <div className="col-md-6">
              <div id="enquiry-report-by-month-container" style={{ height: 300 }} />
            </div>
          </div>
        </Panel>
      </MainContent>
    );
  }

}

export default ReportView;
