define([
    'backbone',
    'models/movie.model',
    'config/config'
  ],
  function(Backbone, movieModel, config) {

    var moviesCollection = Backbone.Collection.extend( {

      model : movieModel,

      url : function () {
        var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='+config.apikey;
        return baseUrl;
      },

      sync : function (method, model, options) {
        options.dataType = options.dataType || 'jsonp';

       Backbone.sync(method, model, options);
      },

      initialize : function(){
        //this.fetch({'dataType' : 'jsonp'});
      },

      parse : function(response) {
          return response.movies;
    }
  });
  return moviesCollection;
});