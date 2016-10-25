define('crud-in-class/controllers/artists/artist', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      createSong: function createSong(e) {
        var _this = this;

        e.preventDefault();
        var name = this.get('songName');
        var price = this.get('price');
        var title = this.get('title');
        var createdBy = this.get('createdBy');
        console.log(name, price, createdBy);

        var promise = $.ajax({
          type: 'post',
          url: 'http://itp-api.herokuapp.com/api/songs',
          data: {
            title: name,
            artist: this.get('model.id'),
            genre: 1,
            price: 1.29,
            createdBy: createdBy
          }
        });

        var controller = this;
        promise.then(function (response) {
          _this.set('songName', null);
          _this.set('price', null);
          _this.set('createdBy', null);
          var songs = _this.get('model.songs');
          // console.log(response);
          // songs.pushObject(response.song);
          var newSongs = songs.concat(response.song);
          _this.set('model.songs', newSongs);
        }, function () {
          alert('error');
        });
      }
    }
  });
});