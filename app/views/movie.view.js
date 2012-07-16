define(
  [
    'underscore',
    'backbone',
    'hbs',
    'jquery',
    // 'jquerymobile',
    'views/detail.view',
    'text!templates/movie.tpl.html'
  ],
  function(_, Backbone, Handlebars, $,/* jQM,*/Detail, tpl) {

    var MovieView = Backbone.View.extend({

      tagName: 'li',

      template: Handlebars.compile(tpl),

      events: {
        'click' : 'details'
      },

      initialize : function(){
        _.bindAll(this, 'render', 'details');
        this.model.bind('change', this.render() );
      },

      render : function(){
        this.$el.html( this.template( this.model.toJSON() ) ).trigger('create');
        return this;
      },

      details : function() {
        var detailMovie = new Detail({model: this.model, el:'#dialog'});
        $('#page').hide();
      }


    });

    return MovieView;
  }
);