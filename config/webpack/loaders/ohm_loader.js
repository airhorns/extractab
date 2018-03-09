module.exports = function(source) {
  return `const ohm = require('ohm-js'); module.exports = ohm.grammar(${JSON.stringify(source)});`;
};
