define('crud-in-class/controllers/artists/new', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			createArtist: function createArtist(e) {
				var _this = this;

				e.preventDefault();
				var name = this.get('artistName');

				var promise = $.ajax({
					type: 'post',
					url: 'http://itp-api.herokuapp.com/api/artists',
					data: {
						name: name
					}
				});

				var controller = this;
				promise.then(function (response) {
					_this.set('name', null);
					var artists = _this.get('model.artists');
					var newArtists = artists.concat(response.artist);
					_this.set('model.artists', newArtists);
				}, function () {
					alert('error');
				});
			}
		}
	});
});