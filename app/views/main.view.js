define(
  [
    'backbone',
    'raphael',
    'hbs',
    'jquery',
    'text!templates/search.tpl.html'
  ],
  function(Backbone, Raphael, Handlebars, $) {
    var SearchView = Backbone.View.extend({

      el : 'body',

      template : Handlebars.compile(tpl),

      events: {
      },

      initialize : function() {
        this.render();
      },

      render : function() {
        this.$el.html( this.template( {title : 'Raphael test'} ) );
      }

    });

    return SearchView;
  }
);