QUnit.module('JSHint | controllers/artists/new.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/artists/new.js should pass jshint.\ncontrollers/artists/new.js: line 17, col 17, \'controller\' is defined but never used.\ncontrollers/artists/new.js: line 9, col 27, \'$\' is not defined.\n\n2 errors');
});
