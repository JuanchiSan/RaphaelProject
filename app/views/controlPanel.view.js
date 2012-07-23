define(
  [
    'backbone',
    'hbs',
    'jquery',
    'text!templates/ControlPanel.tpl.html'
  ],
  function(Backbone, Handlebars, $, tpl) {
    'use strict';
    var ControlPanelView = Backbone.View.extend({

      el : '#controls',

      template : Handlebars.compile(tpl),

      events: {
      },

      initialize : function() {
        var self = this;
        self.render();
      },

      render : function() {
        this.$el.html( this.template() );
      }

    });

    return ControlPanelView;
  }
);