define(
  [
    'backbone',
    'jquery'
  ],
  function(Backbone, $) {
    "use strict";
    var PaperView = Backbone.View.extend({

      el : '#figure_container',

      events: {
      },

      initialize : function() {
        this.render();
      },

      render : function() {
      }

    });

    return PaperView;
  }
);
