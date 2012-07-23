define(
  [
    'backbone',
    'hbs',
    'jquery',
    'text!templates/editPanel.tpl.html',
    'figureModel'
  ],
  function(Backbone, Handlebars, $, tpl, FigureModel) {
    'use strict';
    var EditPanelView = Backbone.View.extend({

      el : '#controls',

      template : Handlebars.compile(tpl),

      events: {
        'click #btnEdit' : 'hideEditPanel'
      },

      initialize : function() {
        var self = this;
        self.render();
      },

      render : function() {
        this.$el.html( this.template(this.model.toJSON() ) );
      },

      hideEditPanel :function() {

      }

    });

    return EditPanelView;
  }
);