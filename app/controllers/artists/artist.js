import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createSong: function(e) {
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
      promise.then((response) => {
        this.set('songName', null);
        this.set('price', null);
        this.set('createdBy', null);
        var songs = this.get('model.songs');
        // console.log(response);
        // songs.pushObject(response.song);
        var newSongs = songs.concat(response.song);
        this.set('model.songs', newSongs);
      }, function() {
        alert('error');
      });
    }
  }
});