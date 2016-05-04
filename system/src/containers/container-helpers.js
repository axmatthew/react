export function baseMapStateToProps(entityUrl, viewName, state) {
  return {
    user: state.users.getIn(['data', 'user']),
    entityConfig: state[entityUrl].get('entityConfig'),
    ui: state[entityUrl].getIn([viewName, 'ui']),
    data: state[entityUrl].getIn([viewName, 'data'])
  };
}
