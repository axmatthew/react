/* global gapi moment */
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import StoreFactory from '../store/store-factory';
import { getEntityModule } from './entity-module';

const ENTITY_URL = 'documents';
const ENTITY_LABEL = 'Documents';

const INITIAL_STATE = fromJS({
  entityConfig: {
    apiUrl: 'SET_IN_ACL',
    label: ENTITY_LABEL,
    url: ENTITY_URL,
    identity: '_id',
    fields: [
      { label: '_id', name: '_id', type: 'hidden' },
      { label: 'enquiryId', name: 'enquiryId', type: 'hidden' },
      { label: 'Creation Date', name: 'createdAt', type: 'date', disabled: true },
      { label: 'Owner', name: 'username', type: 'text', disabled: true },
      { label: 'Type', name: 'type', type: 'choice', choices: [
        'Quotation', 'SalesConfirmation', 'Invoice', 'Receipt', 'DeliveryNote'
      ] },
      { label: 'Document#', name: 'documentNum', type: 'text' },
      { label: 'Parameters', name: 'parameters', type: 'text' },
      { label: 'generated', name: 'generated', type: 'bool', disabled: true },
      { label: 'gSheetId', name: 'gSheetId', type: 'text', disabled: true }
    ],
    iconClass: 'doc'
  },
  listView: {
    ui: {
      title: `All ${ENTITY_LABEL}`,
      loading: false,
      generating: false,
      error: null,
      order: [[0, 'desc']],
      page: 0,
      search: '',
      filters: [
        { name: 'username' }
      ],
      cssClass: entity => `tr-${entity.get('status')}`,
      actions: ['export'],
      listActions: ['delete'],
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
  },
  acls: {
    master: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `master--${ENTITY_URL}` }
    ],
    ones: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `ones--${ENTITY_URL}` }
    ],
    ppp: [
      { keyPath: ['entityConfig', 'apiUrl'], value: `ppp--${ENTITY_URL}` }
    ],
    'purchase@123.com': [
      { keyPath: ['listView', 'ui', 'actions'], value: [] },
      { keyPath: ['listView', 'ui', 'listActions'], value: [] },
    ]
  }
});

const originalEntityModule = getEntityModule(ENTITY_URL, INITIAL_STATE);

export default Object.assign({}, originalEntityModule, (() => {
  const START_GENERATE_DOCUMENT = `${ENTITY_URL}/START_GENERATE_DOCUMENT`;
  const GENERATE_DOCUMENT_SUCCESS = `${ENTITY_URL}/GENERATE_DOCUMENT_SUCCESS`;
  const GENERATE_DOCUMENT_FAILURE = `${ENTITY_URL}/GENERATE_DOCUMENT_FAILURE`;

  return {

    // Extends the original reducer
    reducer: (originalState, action) => {
      // Run the original reducer first
      const state = originalEntityModule.reducer(originalState, action);

      // Chain with new reducer
      switch (action.type) {
        case START_GENERATE_DOCUMENT:
          // set generating
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'generating'], true);
        case GENERATE_DOCUMENT_SUCCESS:
          // cancel generating
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'generating'], false);
        case GENERATE_DOCUMENT_FAILURE:
          // set error and cancel generating
          return state.setIn(['listView', 'ui', 'error'], action.payload)
            .setIn(['listView', 'ui', 'generating'], false);
        default:
          return state;
      }
    },

    /** Create document and generate Google Sheets */
    generateDocument: (enquiry, docType, prefix, suffix, parameters) => (dispatch, getState) => {
      dispatch(startGenerateDocument());

      // Redirect to document list view with search value as enqiuryNum
      dispatch(originalEntityModule.listSearch(enquiry.get('enquiryNum')));
      dispatch(push(getState()[ENTITY_URL].getIn(['entityConfig', 'url'])));

      // Create an dummy document object first
      const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);
      const accountName = getState().users.getIn(['data', 'user', 'accountName']);
      const username = getState().users.getIn(['data', 'user', 'username']);

      StoreFactory.getInstance().insert(apiUrl, {
        enquiryId: enquiry.get('_id'),
        type: docType,
        generated: false
      }, (error, _id) => {
        if (error) {
          dispatch(generateDocumentFailure(error));
          // TODO: go back to enquiry list?
        } else {
          // Then generate the document
          generateDocument(enquiry.toJS(), docType, prefix, suffix, parameters,
            accountName, username, (error2, document) => {
              if (error2) {
                dispatch(generateDocumentFailure(error2));
                // TODO: remove the dummy document object and back to enquiry list?
              } else {
                // Generate success, update the dummy document object with real fields
                dispatch(originalEntityModule.update(_id, document));
                dispatch(generateDocumentSuccess(Object.assign({}, document, { _id })));
              }
            }
          );
        }
      });
    }

  };

  /**
   * Dispatch this when start a generate document process
   */
  function startGenerateDocument() {
    return {
      type: START_GENERATE_DOCUMENT
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function generateDocumentSuccess(document) {
    return {
      type: GENERATE_DOCUMENT_SUCCESS,
      payload: document
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function generateDocumentFailure(error) {
    return {
      type: GENERATE_DOCUMENT_FAILURE,
      payload: error
    };
  }

  /**
   * suffix: for document like Invoice to append 'A'/'B' to document#
   * parameters: for document like Receipt and DN for extra info
   */
  function generateDocument(
    enquiry, docType, prefix = '', suffix = '',
    docParams, accountName, username, callback
  ) {
    let documentNum = `${prefix}${enquiry.enquiryNum}${suffix}`;
    // FIXME: determine how many document with the same documentNum already created
    const count = 0;

    if (count > 0) {
      documentNum += `_${count + 1}`;
    }

    // Determine the codes of Quotation/Invoice/SalesConfirmation
    const codes = enquiry.description && enquiry.description.match(/<[\w\-]*>/g) || ['<>'];

    for (let i = 0; i < codes.length; i++) {
      codes[i] = codes[i].substring(1, codes[i].length - 1);
    }

    // Determine the Apps Script function name to call
    let callFunc = 'generate';

    if (docType === 'Invoice') {
      if (documentNum.indexOf('A') !== -1) {
        callFunc += 'DepositInvoice';
      } else if (documentNum.indexOf('B') !== -1) {
        callFunc += 'BalanceInvoice';
      }
    } else {
      callFunc += docType;
    }

    // Quotation/Invoice/SalesConfirmation use codes, other use docParams
    const scriptParams = [accountName, username, enquiry, docParams || codes];

    // Do call Apps Script function
    callScriptFunction(callFunc, scriptParams, (error, gSheetId) => (
      error ? callback(error) : callback(null, {
        enquiryId: enquiry._id,
        type: docType,
        documentNum,
        parameters: docParams || codes,
        generated: true,
        gSheetId,
        username,
        createdAt: moment().format('YYYY-MM-DD')
      })
    ));
  }

  // Calls an Apps Script function
  function callScriptFunction(callFunc, scriptParams, callback) {
    const scriptId = 'MXGYEugzHbK3KCSNpsvw691yeSNBRcRjT';

    // Create an execution request object.
    const request = {
      function: callFunc,
      parameters: scriptParams,
      devMode: true
    };

    // Make the API request.
    const op = gapi.client.request({
      root: 'https://script.googleapis.com',
      path: `v1/scripts/${scriptId}:run`,
      method: 'POST',
      body: request
    });

    op.execute(resp => {
      if (resp.error && resp.error.status) {
        // The API encountered a problem before the script started executing
        callback(resp.error);
      } else if (resp.error) {
        // The API executed, but the script returned an error.

        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        const error = resp.error.details[0];
        let errorMessage = `error.errorMessage\n`;

        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start executing.
          errorMessage += `Script error stacktrace:\n`;

          for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
            const trace = error.scriptStackTraceElements[i];
            errorMessage += `\t${trace.function}:${trace.lineNumber}\n`;
          }
        }

        callback(errorMessage);
      } else {
        callback(null, resp.response.result);
      }
    });
  }
})());
