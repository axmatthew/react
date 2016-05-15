import { fromJS } from 'immutable';
import { getEntityModule } from './entity-module';

const ENTITY_URL = 'enquiries';
const ENTITY_LABEL = 'Enquiries';

const INITIAL_STATE = fromJS({
  entityConfig: {
    apiUrl: 'SET_IN_ACL',
    label: ENTITY_LABEL,
    iconClass: 'layers',
    url: ENTITY_URL,
    identity: '_id',
    fields: [
      { label: '_id', name: '_id', type: 'hidden' },
      { label: 'Date', name: 'date', type: 'date', defaultValue: () =>
        new Date().toISOString().substring(0, 10) },
      { label: 'Enquiry#', name: 'enquiryNum', type: 'text' },
      { label: 'Sales', name: 'sales', type: 'choice', choices: [] },
      { label: 'Company Name', name: 'companyName', type: 'text' },
      { label: 'Contact Person', name: 'contactPerson', type: 'text' },
      { label: 'Tel(s)', name: 'tels', type: 'text' },
      { label: 'Email(s)', name: 'emails', type: 'text' },
      { label: 'Address', name: 'address', type: 'textarea' },
      { label: 'Description', name: 'description', type: 'textarea' },
      { label: 'Deadline', name: 'deadline', type: 'text' },
      { label: 'Status', name: 'status', type: 'choice', choices: [
        'New', 'Quoted', 'Active', 'NotActive', 'Signed', 'Done', 'Closed'
      ], defaultValue: 'New' },
      { label: 'Remarks', name: 'remarks', type: 'textarea' },
      { label: 'username', name: 'username', type: 'hidden' },
      { label: 'createdAt', name: 'createdAt', type: 'hidden' }
    ]
  },
  listView: {
    ui: {
      title: `All ${ENTITY_LABEL}`,
      loading: false,
      error: null,
      order: [[1, 'desc']],
      page: 0,
      search: '',
      filters: [
        { name: 'sales' },
        { name: 'status' }
      ],
      cssClass: entity => `tr-${entity.get('status')}`,
      actions: ['new', 'export', 'toggle'],
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

export default getEntityModule(ENTITY_URL, INITIAL_STATE);
