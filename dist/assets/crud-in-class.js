"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('crud-in-class/app', ['exports', 'ember', 'crud-in-class/resolver', 'ember-load-initializers', 'crud-in-class/config/environment'], function (exports, _ember, _crudInClassResolver, _emberLoadInitializers, _crudInClassConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _crudInClassConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _crudInClassConfigEnvironment['default'].podModulePrefix,
    Resolver: _crudInClassResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _crudInClassConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('crud-in-class/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'crud-in-class/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _crudInClassConfigEnvironment) {

  var name = _crudInClassConfigEnvironment['default'].APP.name;
  var version = _crudInClassConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
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
define('crud-in-class/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('crud-in-class/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('crud-in-class/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'crud-in-class/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _crudInClassConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_crudInClassConfigEnvironment['default'].APP.name, _crudInClassConfigEnvironment['default'].APP.version)
  };
});
define('crud-in-class/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('crud-in-class/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('crud-in-class/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('crud-in-class/initializers/export-application-global', ['exports', 'ember', 'crud-in-class/config/environment'], function (exports, _ember, _crudInClassConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_crudInClassConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _crudInClassConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_crudInClassConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('crud-in-class/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('crud-in-class/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('crud-in-class/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("crud-in-class/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('crud-in-class/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('crud-in-class/router', ['exports', 'ember', 'crud-in-class/config/environment'], function (exports, _ember, _crudInClassConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _crudInClassConfigEnvironment['default'].locationType,
    rootURL: _crudInClassConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('artists', function () {
      this.route('artist', { path: ':id' });
      this.route('new');
    });
  });

  exports['default'] = Router;
});
define('crud-in-class/routes/artists', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			var promise = $.ajax({
				type: 'get',
				url: 'http://itp-api.herokuapp.com/api/artists'
			});
			return promise;
		}
	});
});
define('crud-in-class/routes/artists/artist', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(params) {
			var artistID = params.id;
			var promise = $.ajax({
				type: 'get',
				url: 'http://itp-api.herokuapp.com/api/artists/' + artistID + '/songs'
			}).then(function (response) {
				return {
					id: response.artists[0].id,
					name: response.artists[0].name,
					songs: response.songs
				};
			});
			return promise;
		}
	});
});
define('crud-in-class/routes/artists/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('crud-in-class/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("crud-in-class/templates/artists", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 3
            },
            "end": {
              "line": 5,
              "column": 48
            }
          },
          "moduleName": "crud-in-class/templates/artists.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Create a New Artist");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 3
              },
              "end": {
                "line": 11,
                "column": 57
              }
            },
            "moduleName": "crud-in-class/templates/artists.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "artist.name", ["loc", [null, [11, 42], [11, 57]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 3
            },
            "end": {
              "line": 13,
              "column": 3
            }
          },
          "moduleName": "crud-in-class/templates/artists.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["artists.artist", ["get", "artist.id", ["loc", [null, [11, 31], [11, 40]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [11, 3], [11, 69]]]]],
        locals: ["artist"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "crud-in-class/templates/artists.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-4");
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 6, 6);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["artists.new"], [], 0, null, ["loc", [null, [5, 3], [5, 60]]]], ["block", "each", [["get", "model.artists", ["loc", [null, [9, 11], [9, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [9, 3], [13, 12]]]], ["content", "outlet", ["loc", [null, [16, 3], [16, 13]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("crud-in-class/templates/artists/artist", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "crud-in-class/templates/artists/artist.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "song");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "song.title", ["loc", [null, [3, 2], [3, 16]]], 0, 0, 0, 0]],
        locals: ["song"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "crud-in-class/templates/artists/artist.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("No songs for this artist.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 7
          }
        },
        "moduleName": "crud-in-class/templates/artists/artist.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n	Name: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Price: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Created by: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "submit");
        dom.setAttribute(el2, "class", "btn btn-primary");
        var el3 = dom.createTextNode("Create Song");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [5]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element0, 'onsubmit');
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        morphs[3] = dom.createMorphAt(element0, 4, 4);
        morphs[4] = dom.createMorphAt(element0, 7, 7);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.songs", ["loc", [null, [1, 8], [1, 19]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [7, 9]]]], ["attribute", "onsubmit", ["subexpr", "action", ["createSong"], [], ["loc", [null, [null, null], [11, 38]]], 0, 0], 0, 0, 0, 0], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "songName", ["loc", [null, [12, 33], [12, 41]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [12, 7], [12, 43]]], 0, 0], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "price", ["loc", [null, [13, 34], [13, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [13, 8], [13, 41]]], 0, 0], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "createdBy", ["loc", [null, [14, 39], [14, 48]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [14, 13], [14, 50]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("crud-in-class/templates/artists/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "crud-in-class/templates/artists/new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n	Name: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "submit");
        dom.setAttribute(el2, "class", "btn btn-primary");
        var el3 = dom.createTextNode("Create Artist");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'onsubmit');
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["attribute", "onsubmit", ["subexpr", "action", ["createArtist"], [], ["loc", [null, [null, null], [1, 40]]], 0, 0], 0, 0, 0, 0], ["inline", "input", [], ["type", "text", "value", ["subexpr", "@mut", [["get", "artistName", ["loc", [null, [2, 33], [2, 43]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [2, 7], [2, 45]]], 0, 0], ["content", "outlet", ["loc", [null, [6, 0], [6, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('crud-in-class/config/environment', ['ember'], function(Ember) {
  var prefix = 'crud-in-class';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("crud-in-class/app")["default"].create({"name":"crud-in-class","version":"0.0.0+fd1a603c"});
}

/* jshint ignore:end */
//# sourceMappingURL=crud-in-class.map
