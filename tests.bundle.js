var environment = require('./environment.js');

var context = require.context('./' + environment.APP + '/tests', true, /-test\.(js|jsx)$/);
context.keys().forEach(context);
module.exports = context;
