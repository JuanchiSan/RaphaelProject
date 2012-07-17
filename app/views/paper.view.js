define(
  [
    'backbone',
    'raphael',
    'jquery'
  ],
  function(Backbone, Raphael, $) {
    "use strict";
    var PaperView = Backbone.View.extend({

      el : '#figure_container',

      events: {
      },

      initialize : function() {
        this.render();
      },

      render : function() {
        this.$el.html( this.template( {title : 'Raphael test'} ) );
      }

    });

    return PaperView;
  }
);
