import React, { Component } from 'react';
import Modal from '../common/modal';

class GPCalculator extends Component {

  constructor() {
    super();

    this.calculate = this.calculate.bind(this);
    this.calculateByGp = this.calculateByGp.bind(this);
  }

  calculate() {
    // Settings
    // FIXME: put exchange rate in a new settings module
    const EX_HKD_RMB = 0.84;
    const BUFFER = 0.018;

    const totalPrice = Number(this.refs.price.value || 0) * Number(this.refs.amount.value || 0);
    const totalCost = (Number(this.refs.cost.value || 0) +
      Number(this.refs.logisticsCost.value || 0)) * Number(this.refs.amount.value || 0) +
      Number(this.refs.otherCost.value || 0);
    const bufferedTotalCost = totalCost * (1 + BUFFER);
    const gp = totalPrice - bufferedTotalCost / EX_HKD_RMB;
    const gpPercentage = totalPrice ? gp / totalPrice : 0;

    // Set the totalPrice, gp to input value
    this.refs.totalPrice.value = Math.round(totalPrice);
    this.refs.gp.value = Math.round(gp);
    this.refs.gpPercentage.value = `${(gpPercentage * 100).toFixed(1)}%`;

    this.calculateOthers(totalPrice, bufferedTotalCost, gpPercentage);
  }

  calculateByGp() {
    const EX_HKD_RMB = 0.84;
    const BUFFER = 0.018;
    const gp = Number(this.refs.gp.value || 0);
    const totalCost = (Number(this.refs.cost.value || 0) +
      Number(this.refs.logisticsCost.value || 0)) * Number(this.refs.amount.value || 0) +
      Number(this.refs.otherCost.value || 0);

    // Continue to calculate only if totalCost is ready
    if (totalCost) {
      const bufferedTotalCost = totalCost * (1 + BUFFER);
      const totalPrice = gp + bufferedTotalCost / EX_HKD_RMB;
      const price = totalPrice / Number(this.refs.amount.value);
      const gpPercentage = totalPrice ? gp / totalPrice : 0;

      // Set the totalPrice, gp to input value
      this.refs.price.value = price.toFixed(2);
      this.refs.totalPrice.value = Math.round(totalPrice);
      this.refs.gpPercentage.value = `${(gpPercentage * 100).toFixed(1)}%`;

      this.calculateOthers(totalPrice, bufferedTotalCost, gpPercentage);
    }
  }

  calculateOthers(totalPrice, bufferedTotalCost, gpPercentage) {
    const EX_HKD_RMB = 0.84;
    const MIN_GP_TABLE = [
      [200000, '神單', 0.22],
      [120000, '超大單', 0.235],
      [68000, '大單', 0.25],
      [38000, '中單', 0.26],
      [20000, '中單', 0.28],
      [8000, '細單', 0.3],
      [3000, 'Hea單', 0.36],
      [0, '單?', 0.45]
    ];
    const ACTION_TABLE = [
      [1.3, '利潤很好'],
      [1.12, '利潤不錯'],
      [0.97, '利潤OK'],
      [0.88, '毛利率偏低、但仍可做'],
      [0.79, '毛利率過低、要攞出來傾'],
      [0, '賠本單、需要加價']
    ];

    // Determine type, minGp, minPrice if bufferedTotalCost is ready
    if (bufferedTotalCost) {
      let minGpRecord;

      for (let i = 0; i < MIN_GP_TABLE.length; i++) {
        const curRecord = MIN_GP_TABLE[i];

        if (bufferedTotalCost >= curRecord[0]) {
          minGpRecord = curRecord;

          break;
        }
      }

      this.refs.type.value = minGpRecord[1];
      this.refs.minGp.value = `${(minGpRecord[2] * 100).toFixed(1)}%`;
      this.refs.minPrice.value = (bufferedTotalCost / EX_HKD_RMB / (1 - minGpRecord[2]) /
        Number(this.refs.amount.value)).toFixed(2);
      this.refs.suggestedPrice.value = (bufferedTotalCost / EX_HKD_RMB /
        (1 - minGpRecord[2] * 1.17) / Number(this.refs.amount.value)).toFixed(2);

      // Determine action if gpPercentage is ready
      if (gpPercentage >= 0) {
        let action;

        for (let i = 0; i < ACTION_TABLE.length; i++) {
          const curRecord = ACTION_TABLE[i];

          if ((gpPercentage / minGpRecord[2]) >= curRecord[0]) {
            action = curRecord[1];

            break;
          }
        }

        this.refs.action.value = action;
      } else if (gpPercentage < 0) {
        this.refs.action.value = '負毛利率';
      } else {
        this.refs.action.value = '';
      }
    } else {
      this.refs.type.value = '';
      this.refs.minGp.value = '';
      this.refs.minPrice.value = '';
      this.refs.suggestedPrice.value = '';
    }
  }

  render() {
    return (
      <Modal id="gp-calculator" title="G.P. Calculator" size="modal-lg">
        <form method="get" action="/" className="form-horizontal">
          <fieldset>
            <div className="form-group">
              <label className="col-sm-2 control-label">數量</label>
              <div className="col-sm-10">
                <input
                  ref="amount"
                  type="text"
                  className="form-control"
                  onChange={this.calculate}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">報價(港幣)</label>
              <div className="col-sm-10">
                <input
                  ref="price"
                  type="text"
                  className="form-control"
                  onChange={this.calculate}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label className="col-sm-2 control-label">成本(人民幣)</label>
              <div className="col-sm-10">
                <input
                  ref="cost"
                  type="text"
                  className="form-control"
                  onChange={this.calculate}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">其他成本</label>
              <div className="col-sm-10">
                <input
                  ref="otherCost"
                  type="text"
                  className="form-control"
                  placeholder="樣板費、印刷費、版費、QC費等，一般最少預$300其他成本"
                  onChange={this.calculate}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">每件物流成本</label>
              <div className="col-sm-10">
                <input
                  ref="logisticsCost"
                  type="text"
                  className="form-control"
                  placeholder="約RMB2/KG(深圳)、RMB3/KG(浙江)"
                  onChange={this.calculate}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label className="col-sm-2 control-label">銷售額</label>
              <div className="col-sm-10">
                <input
                  ref="totalPrice"
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: '#2196F3' }}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">毛利</label>
              <div className="col-sm-10">
                <input
                  ref="gp"
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: '#03A9F4' }}
                  onChange={this.calculateByGp}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">毛利率</label>
              <div className="col-sm-10">
                <input
                  ref="gpPercentage"
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: '#2196F3' }}
                  disabled
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  ref="action"
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: '#FFEB3B' }}
                  disabled
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label className="col-sm-2 control-label">單類別</label>
              <div className="col-sm-10">
                <input ref="type" type="text" className="form-control" disabled />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">建議最低毛利率</label>
              <div className="col-sm-10">
                <input ref="minGp" type="text" className="form-control" disabled />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">建議最少報</label>
              <div className="col-sm-10">
                <input ref="minPrice" type="text" className="form-control" disabled />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">較好報價為</label>
              <div className="col-sm-10">
                <input ref="suggestedPrice" type="text" className="form-control" disabled />
                <span className="help-block m-b-none">
                  注：以下三項情況，毛利率需要比系統建議再高幾個百分點<br />
                  1、風險較高、新產品、新廠等<br />
                  2、貨期趕<br />
                  3、沒有訂金 / 尾數數期1個星期以上
                </span>
              </div>
            </div>
          </fieldset>
        </form>
      </Modal>
    );
  }

}

export default GPCalculator;
