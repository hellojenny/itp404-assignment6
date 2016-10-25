QUnit.module('JSHint | routes/artists/artist.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/artists/artist.js should pass jshint.\nroutes/artists/artist.js: line 6, col 23, \'$\' is not defined.\n\n1 error');
});
