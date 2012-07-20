define(
  [
    'backbone',
    'hbs',
    'jquery',
    'text!templates/main.tpl.html'
  ],
  function(Backbone, Handlebars, $, tpl) {
    'use strict';
    var MainView = Backbone.View.extend({

      el : 'body',

      template : Handlebars.compile(tpl),

      events: {
      },

      initialize : function() {
        var self = this;
        self.render();
      },

      render : function() {
        this.$el.html( this.template( {title : 'Raphael test'} ) );
      }

    });

    return MainView;
  }
);