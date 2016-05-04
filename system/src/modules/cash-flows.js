import { fromJS } from 'immutable';
import { getEntityModule } from './entity-module';

const ENTITY_URL = 'cashFlows';
const ENTITY_LABEL = 'Cash Flows';
const TYPES = ['客訂金', '客尾數', '廠訂金', '廠尾數'];

const INITIAL_STATE = fromJS({
  entityConfig: {
    apiUrl: ENTITY_URL,
    label: ENTITY_LABEL,
    url: ENTITY_URL,
    identity: '_id',
    fields: [
      { label: '_id', name: '_id', type: 'hidden' },
      { label: 'purchaseOrderId', name: 'purchaseOrderId', type: 'hidden' },
      { label: 'Date', name: 'date', type: 'date' },
      { label: 'Sales', name: 'sales', type: 'text', disabled: true },
      { label: 'Type', name: 'type', type: 'number', disabled: true,
        transform: value => TYPES[value] },
      { label: 'Title', name: 'title', type: 'text' },
      { label: 'Amount', name: 'amount', type: 'number' },
      { label: 'Done', name: 'done', type: 'bool' }
    ],
    iconClass: 'map'
  },
  listView: {
    ui: {
      title: `All ${ENTITY_LABEL}`,
      loading: false,
      error: null,
      order: [[0, 'asc']],
      page: 0,
      search: '',
      filters: [
        { name: 'sales' },
        { name: 'type' },
        { name: 'done', value: 'No' }
      ],
      actions: ['export'],
      listActions: ['edit', 'delete'],
      displayClosedDone: true,
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
  }
});

export default getEntityModule(ENTITY_URL, INITIAL_STATE);
