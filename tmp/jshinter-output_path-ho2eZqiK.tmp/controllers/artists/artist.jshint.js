QUnit.module('JSHint | controllers/artists/artist.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/artists/artist.js should pass jshint.\ncontrollers/artists/artist.js: line 9, col 11, \'title\' is defined but never used.\ncontrollers/artists/artist.js: line 25, col 11, \'controller\' is defined but never used.\ncontrollers/artists/artist.js: line 13, col 21, \'$\' is not defined.\n\n3 errors');
});
