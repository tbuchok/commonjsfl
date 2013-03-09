var assert = {};
assert.ok = function(a, b, message) {
  if (a === b) console.log('OK: ' + message);
  else {
    throw new Error('NOT ok: ' + message);
  }
}
assert.notOk = function(a, b, message) {
  if (a !== b) console.log('OK: ' + message);
  else {
    throw new Error('NOT ok: ' + message);
  }
}

module.exports = assert;