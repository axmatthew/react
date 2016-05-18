/* global moment */
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import { getEntityModule } from './entity-module';
import StoreFactory from '../store/store-factory';
import enquiryModule from './enquiries';
import cashFlowModule from './cash-flows';

const ENTITY_URL = 'purchaseOrders';
const ENTITY_LABEL = 'Purchase Orders';

const INITIAL_STATE = fromJS({
  entityConfig: {
    apiUrl: 'SET_IN_ACL',
    label: ENTITY_LABEL,
    url: ENTITY_URL,
    identity: '_id',
    fields: [
      { label: '_id', name: '_id', type: 'hidden' },
      { label: 'enquiryId', name: 'enquiryId', type: 'hidden' },
      { label: 'Sign Date', name: 'signDate', type: 'date', defaultValue: () =>
        new Date().toISOString().substring(0, 10) },
      { label: 'PO#', name: 'poNum', type: 'text' },
      { label: 'Purchase', name: 'purchase', type: 'choice', choices: [] },
      { label: 'Sales', name: 'sales', type: 'choice', choices: [] },
      { label: 'Company Name', name: 'companyName', type: 'text' },
      { label: 'Contact Person', name: 'contactPerson', type: 'text' },
      { label: 'Tel(s)', name: 'tels', type: 'text' },
      { label: 'Email(s)', name: 'emails', type: 'text' },
      { label: 'Delivery Address', name: 'deliveryAddress', type: 'textarea' },
      { label: 'Description', name: 'description', type: 'textarea' },
      { label: '廠', name: 'factory', type: 'text' },
      { label: '成本 (RMB)', name: 'cost', type: 'number', defaultValue: 0 },
      { label: '單價', name: 'price', type: 'number', defaultValue: 0 },
      { label: '數量', name: 'amount', type: 'number', defaultValue: 0 },
      { label: '備品', name: 'spareAmount', type: 'number', defaultValue: 0 },
      { label: '其他成本 (RMB)', name: 'otherCost', type: 'number', defaultValue: 0 },
      { label: '預計物流成本 (RMB)', name: 'logisticsCost', type: 'number', defaultValue: 0 },
      { label: '預計出樣板日', name: 'sampleDate', type: 'date' },
      { label: '預計出貨日', name: 'deliveryDate', type: 'date' },
      { label: '預計收尾數日', name: 'deadline', type: 'date', validations: { required: true } },
      { label: '狀態', name: 'status', type: 'choice', choices: [
        'New', 'Sample', 'Manufacturing', 'Delivering', 'Done', 'Closed'
      ], defaultValue: 'New' },
      { label: 'Finish Date', name: 'finishDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'textarea' },
      { label: 'G.P. %', name: 'gpPercentage', transform: (value, entity, settings) =>
        calculateGpPercentage(entity.toJS(), settings.get('exchangeRate')), notEditable: true },
      { label: 'Est. Profit (HKD)', name: 'estimateProfit', transform: (value, entity, settings) =>
        calculateGp(entity.toJS(), settings.get('exchangeRate')), notEditable: true },
      { label: '已收客訂金', name: 'paidDeposit', type: 'bool' },
      { label: '已收客尾數', name: 'paidRemaining', type: 'bool' },
      { label: '已付廠訂金', name: 'paidFactoryDeposit', type: 'bool' },
      { label: '已付廠尾數', name: 'paidFactoryRemaining', type: 'bool' }
    ],
    iconClass: 'grid'
  },
  listView: {
    ui: {
      title: `All ${ENTITY_LABEL}`,
      loading: false,
      error: null,
      order: [[0, 'desc']],
      page: 0,
      search: '',
      filters: [
        { name: 'purchase' },
        { name: 'sales' },
        { name: 'status' }
      ],
      cssClass: entity => `tr-${entity.get('status')}`,
      actions: ['export', 'toggle'],
      listActions: ['edit', 'delete'],
      displayClosedDone: false,
      displayContextMenu: false,
      contextMenuLeft: 0,
      contextMenuTop: 0
    },
    data: {
      entities: [],
      contextMenuEntity: null
    }
  },
  newView: {
    ui: {
      title: `New ${ENTITY_LABEL}`,
      loading: false,
      fetchingDuplicates: false,
      error: null
    },
    data: {
      entity: null
    }
  },
  editView: {
    ui: {
      title: `Edit ${ENTITY_LABEL}`,
      loading: false,
      error: null
    },
    data: {
      entity: null
    }
  },
  acls: {
    master: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `master--${ENTITY_URL}` },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'purchase', setWith: {
            label: 'Purchase', name: 'purchase', type: 'choice',
            choices: ['', 'Eva', 'Lucy', 'Dawson', 'Penny', 'Matthew']
          }
        }
      },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'sales', setWith: {
            label: 'Sales', name: 'sales', type: 'choice',
            choices: ['', 'Dawson', 'Penny', 'Matthew']
          }
        }
      }
    ],
    ones: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `ones--${ENTITY_URL}` },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'purchase', setWith: {
            label: 'Purchase', name: 'purchase', type: 'choice',
            choices: ['', 'Kelvin', 'Mike', 'Wyman', 'Zach', 'Nancy', 'Fen']
          }
        }
      },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'sales', setWith: {
            label: 'Sales', name: 'sales', type: 'choice',
            choices: ['', 'Kelvin', 'Mike', 'Wyman', 'Zach', 'Nancy']
          }
        }
      }
    ],
    ppp: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `ppp--${ENTITY_URL}` },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'purchase', setWith: {
            label: 'Purchase', name: 'purchase', type: 'choice',
            choices: ['', 'Mon']
          }
        }
      },
      {
        keyPath: ['entityConfig', 'fields'],
        replace: {
          findKey: 'name', findValue: 'sales', setWith: {
            label: 'Sales', name: 'sales', type: 'choice',
            choices: ['', 'Mon']
          }
        }
      }
    ],
    'purchase@123.com': [
      { keyPath: ['listView', 'ui', 'actions'], value: ['toggle'] },
      { keyPath: ['listView', 'ui', 'listActions'], value: [] },
    ]
  }
});

function calculateGp(purchaseOrder, exchangeRate) {
  const EX_HKD_RMB = exchangeRate;
  const totalPrice = purchaseOrder.price * purchaseOrder.amount;
  const totalCost = purchaseOrder.cost *
    (purchaseOrder.amount + (purchaseOrder.spareAmount || 0)) +
    (purchaseOrder.otherCost || 0) + (purchaseOrder.logisticsCost || 0);
  const gp = totalPrice - totalCost / EX_HKD_RMB;

  // Invariant Violation, can be fixed using toString?
  return Math.round(gp || 0).toString();
}

function calculateGpPercentage(purchaseOrder, exchangeRate) {
  const totalPrice = purchaseOrder.price * purchaseOrder.amount;

  if (totalPrice === 0) return '';

  const gp = calculateGp(purchaseOrder, exchangeRate);
  const gpPercentage = gp / totalPrice;

  return `${((gpPercentage || 0) * 100).toFixed(1)}%`;
}

const originalEntityModule = getEntityModule(ENTITY_URL, INITIAL_STATE);

export default Object.assign({}, originalEntityModule, (() => {
  // Override create
  const START_CREATE = `${ENTITY_URL}/START_CREATE`;
  const CREATE_SUCCESS = `${ENTITY_URL}/CREATE_SUCCESS`;
  const CREATE_FAILURE = `${ENTITY_URL}/CREATE_FAILURE`;

  // Fetch related enquiry
  const START_FETCH_ENQUIRY_FOR_NEW_VIEW = `${ENTITY_URL}/START_FETCH_ENQUIRY_FOR_NEW_VIEW`;
  const FETCH_ENQUIRY_FOR_NEW_VIEW_SUCCESS = `${ENTITY_URL}/FETCH_ENQUIRY_FOR_NEW_VIEW_SUCCESS`;
  const FETCH_ENQUIRY_FOR_NEW_VIEW_FAILURE = `${ENTITY_URL}/FETCH_ENQUIRY_FOR_NEW_VIEW_FAILURE`;

  // Fetch purchase orders for the same enquiryId to calculate poNum
  const START_FETCH_DUPLICATES_FOR_NEW_VIEW =
    `${ENTITY_URL}/START_FETCH_DUPLICATES_FOR_NEW_VIEW`;
  const FETCH_DUPLICATES_FOR_NEW_VIEW_SUCCESS =
    `${ENTITY_URL}/FETCH_DUPLICATES_FOR_NEW_VIEW_SUCCESS`;
  const FETCH_DUPLICATES_FOR_NEW_VIEW_FAILURE =
    `${ENTITY_URL}/FETCH_DUPLICATES_FOR_NEW_VIEW_FAILURE`;

  // Create cash flow records
  const START_CREATE_CASH_FLOWS = `${ENTITY_URL}/START_CREATE_CASH_FLOWS`;

  return {

    // Extends the original reducer
    reducer: (originalState, action) => {
      // Run the original reducer first
      const state = originalEntityModule.reducer(originalState, action);

      // Chain with new reducer
      switch (action.type) {
        case START_CREATE:
          // set loading
          return state.setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], true);
        case CREATE_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['newView', 'data', 'created'], fromJS(action.payload))
            .setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], false);
        case CREATE_FAILURE:
          // set error and cancel loading
          return state.setIn(['newView', 'ui', 'error'], action.payload)
            .setIn(['newView', 'ui', 'loading'], false);
        case START_FETCH_ENQUIRY_FOR_NEW_VIEW:
          // set loading
          return state.setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], true);
        case FETCH_ENQUIRY_FOR_NEW_VIEW_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['newView', 'data', 'enquiry'], fromJS(action.payload))
            .setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], false);
        case FETCH_ENQUIRY_FOR_NEW_VIEW_FAILURE:
          // set error and cancel loading
          return state.setIn(['newView', 'ui', 'error'], action.payload)
            .setIn(['newView', 'ui', 'loading'], false);
        case START_FETCH_DUPLICATES_FOR_NEW_VIEW:
          // set loading
          return state.setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'fetchingDuplicates'], true);
        case FETCH_DUPLICATES_FOR_NEW_VIEW_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['newView', 'data', 'duplicates'], fromJS(action.payload))
            .setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'fetchingDuplicates'], false);
        case FETCH_DUPLICATES_FOR_NEW_VIEW_FAILURE:
          // set error and cancel loading
          return state.setIn(['newView', 'ui', 'error'], action.payload)
            .setIn(['newView', 'ui', 'fetchingDuplicates'], false);
        case START_CREATE_CASH_FLOWS:
          // no state change
          // TODO: any ui logics for create cash flow records?
          return state;
        default:
          return state;
      }
    },

    // Override to create cash flows
    // FIXME: duplicate code with entity-module.js
    create: (fields, redirectUrl) => (dispatch, getState) => {
      const user = getState().users.getIn(['data', 'user']);
      const mergedFields = Object.assign(fields, {
        username: user && user.get('username'),
        createdAt: moment().format('YYYY-MM-DD')
      });

      dispatch(startCreate(mergedFields, redirectUrl));

      const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().insert(apiUrl, mergedFields, (error, _id) => {
        if (error) {
          dispatch(createFailure(error));
        } else {
          const createdEntity = Object.assign({}, mergedFields, { _id });
          dispatch(createSuccess(createdEntity));

          if (redirectUrl) {
            dispatch(push(redirectUrl));
          }

          // Change enquiry status to Signed
          dispatch(enquiryModule.update(createdEntity.enquiryId, { status: 'Signed' }));

          // Create cash flow records
          dispatch(createCashFlowsAction(_id));
        }
      });
    },

    fetchEnquiryForNewView: enquiryId => (dispatch, getState) => {
      dispatch(startFetchEnquiryForNewView(enquiryId));

      const apiUrl = getState()[enquiryModule.entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveOne(apiUrl, enquiryId, enquiry => {
        if (!enquiry) {
          dispatch(fetchEnquiryForNewViewFailure('related enquiry not found'));
        } else {
          dispatch(fetchEnquiryForNewViewSuccess(enquiry));
        }
      });
    },

    fetchDuplicatesForNewView: enquiryId => (dispatch, getState) => {
      dispatch(startFetchDuplicatesForNewView(enquiryId));

      const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveBy(apiUrl, 'enquiryId', enquiryId, duplicates => {
        if (!duplicates) {
          dispatch(fetchDuplicatesForNewViewFailure('not found'));
        } else {
          dispatch(fetchDuplicatesForNewViewSuccess(duplicates));
        }
      });
    },

    createCashFlows: createCashFlowsAction

  };

  function createCashFlowsAction(_id) {
    return (dispatch, getState) => {
      dispatch(startCreateCashFlows(_id));

      const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveOne(apiUrl, _id, purchaseOrder => {
        const startDate = purchaseOrder.sampleDate || purchaseOrder.signDate;
        // deadline is required
        const deadline = purchaseOrder.deadline;
        // set deliveryDate to deadline if not provided
        const deliveryDate = purchaseOrder.deliveryDate || deadline;

        const totalCost = purchaseOrder.cost * (purchaseOrder.amount + purchaseOrder.spareAmount);
        const totalPrice = purchaseOrder.price * purchaseOrder.amount;

        if (totalCost !== 0) {
          // [1/4] Factory deposit
          dispatch(cashFlowModule.create({
            purchaseOrderId: purchaseOrder._id,
            sales: purchaseOrder.sales,
            type: 2,
            title: `${purchaseOrder.poNum}廠訂金 (${purchaseOrder.companyName})`,
            date: startDate,
            amount: +(totalCost * 0.3).toFixed(2),
            done: false
          }));

          // [2/4] Factory remaining
          dispatch(cashFlowModule.create({
            purchaseOrderId: purchaseOrder._id,
            sales: purchaseOrder.sales,
            type: 3,
            title: `${purchaseOrder.poNum}廠尾數 (${purchaseOrder.companyName})`,
            date: deliveryDate,
            amount: +(totalCost * 0.7).toFixed(2),
            done: false
          }));
        }

        if (totalPrice !== 0) {
          // [3/4] Client deposit
          dispatch(cashFlowModule.create({
            purchaseOrderId: purchaseOrder._id,
            sales: purchaseOrder.sales,
            type: 0,
            title: `${purchaseOrder.poNum}客訂金 (${purchaseOrder.companyName})`,
            date: startDate,
            amount: +(totalPrice * 0.5).toFixed(2),
            done: false
          }));

          // [4/4] Client remaining
          dispatch(cashFlowModule.create({
            purchaseOrderId: purchaseOrder._id,
            sales: purchaseOrder.sales,
            type: 1,
            title: `${purchaseOrder.poNum}客尾數 (${purchaseOrder.companyName})`,
            date: deadline,
            amount: +(totalPrice * 0.5).toFixed(2),
            done: false
          }));
        }
      });
    };
  }

  /**
   * Dispatch this when start a create process
   */
  function startCreate(mergedFields, redirectUrl) {
    return {
      type: START_CREATE,
      payload: { mergedFields, redirectUrl }
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function createSuccess(entity) {
    return {
      type: CREATE_SUCCESS,
      payload: entity
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function createFailure(error) {
    return {
      type: CREATE_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a fetch process
   */
  function startFetchEnquiryForNewView(enquiryId) {
    return {
      type: START_FETCH_ENQUIRY_FOR_NEW_VIEW,
      payload: enquiryId
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function fetchEnquiryForNewViewSuccess(enquiry) {
    return {
      type: FETCH_ENQUIRY_FOR_NEW_VIEW_SUCCESS,
      payload: enquiry
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function fetchEnquiryForNewViewFailure(error) {
    return {
      type: FETCH_ENQUIRY_FOR_NEW_VIEW_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a fetch process
   */
  function startFetchDuplicatesForNewView(enquiryId) {
    return {
      type: START_FETCH_DUPLICATES_FOR_NEW_VIEW,
      payload: enquiryId
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function fetchDuplicatesForNewViewSuccess(duplicates) {
    return {
      type: FETCH_DUPLICATES_FOR_NEW_VIEW_SUCCESS,
      payload: duplicates
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function fetchDuplicatesForNewViewFailure(error) {
    return {
      type: FETCH_DUPLICATES_FOR_NEW_VIEW_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a create process
   */
  function startCreateCashFlows(_id) {
    return {
      type: START_CREATE_CASH_FLOWS,
      payload: _id
    };
  }
})());
