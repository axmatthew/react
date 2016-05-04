var context = require.context('./system/tests', true, /-test\.(js|jsx)$/);
context.keys().forEach(context);
module.exports = context;
