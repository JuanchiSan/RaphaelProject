define(
  [
    'backbone',
    'hbs',
    'jquery',
    // 'jquerymobile',
    'text!templates/search.tpl.html',
    'collections/movie.collection',
    'views/movie.collection.view'
  ],
  function(Backbone, Handlebars, $, /*jQM,*/ tpl, Movies, MoviesView) {
    var SearchView = Backbone.View.extend({
      movies: '',

      el : 'body',

      events: {
        'click .searchbutton' : 'searchmovie',
        'keyup .searchfield' : 'enterkeysearch'
      },

      initialize : function() {
        this.render();
        this.movies = new Movies();
        var mv = new MoviesView({ el:'#movie-list', collection: this.movies});
      },

      render : function() {
        var template = Handlebars.compile(tpl);
        this.$el.html(template()).trigger('create');
      },

      searchmovie : function() {
        var movie = $('.searchfield').val();
        this.movies.fetch({ data: {'q' : movie} } );
      },

     enterkeysearch :function(key){
        if(key.keyCode===13){
          this.searchmovie();
        }
      }
    });

    return SearchView;
  }
);