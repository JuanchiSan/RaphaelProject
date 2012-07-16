define([
  'underscore',
  'backbone',
  'jquery',
  // 'jquerymobile',
  'views/movie.view'
], function( _, Backbone, $, /*JQM,*/ MovieView){

    var MovieCollectionView = Backbone.View.extend({

    ItemView: MovieView,

    initialize: function(){
      _.bindAll(this, 'render', 'appendItem');
      this.collection.bind('reset', this.render );
      this.collection.bind('add', this.appendItem );
    },

    render: function(items){
      var myself = this;
      _.each( items.models, function(item) {
        myself.appendItem(item);
      } );

      return this;
    },

    appendItem: function(item) {
      var newItemView = new this.ItemView({ model: item });
      $(this.el).append( newItemView.render().el );
    }

  });

  return MovieCollectionView;

});