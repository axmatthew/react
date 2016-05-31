export function baseMapStateToProps(entityUrl, viewName, state) {
  return {
    settings: state.settings.get('data'),
    user: state.users.getIn(['data', 'user']),
    entityConfig: state[entityUrl].get('entityConfig'),
    ui: state[entityUrl].getIn([viewName, 'ui']),
    data: state[entityUrl].getIn([viewName, 'data'])
  };
}
