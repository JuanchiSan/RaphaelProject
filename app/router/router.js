
define([
    'backbone'
  ],
  function(Backbone) {

    var AppRouter = Backbone.Router.extend( {

      routes : {
        '*actions' : 'landingPage'
      },

      landingPage : function() {
        var sv = new SearchView();
      }

    });

    var init = function() {
      new AppRouter();
      Backbone.history.start();
    };

    return {
      init : init
    };
  }
);
