define(
  [
    'backbone',
    'hbs',
    'jquery',
    'editPanel',
    'text!templates/main.tpl.html',
    'rectModel',
    'circleModel'
  ],
  function(Backbone, Handlebars, $, EditPanel, tpl, RectModel, CircleModel) {
    'use strict';
    var MainView = Backbone.View.extend({

      el : 'body',

      template : Handlebars.compile(tpl),

      events: {
        'click #btnAddRect' : 'showEditPanelRect',
        'click #btnAddCircule' : 'showEditPanelCircle'
      },

      initialize : function() {
        var self = this;
        self.render();
      },

      render : function() {
        this.$el.html( this.template( {title : 'Raphael test'} ) );
      },

      showEditPanelRect : function() {
        var editPanel = new EditPanel({model: RectModel});
      },

      showEditPanelCircle : function() {
        var editPanel = new EditPanel({model: CircleModel});
      }

    });

    return MainView;
  }
);