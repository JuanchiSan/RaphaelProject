define(
  [
    'jquery',
    'backbone',
    'raphael',
    'figureModel'
  ],
  function($ ,Backbone, Raphael, FigureModel) {
    'use strict';
    var BoardView = Backbone.View.extend({

      el : '#figure_container',
      

      events: {

      },

      initialize : function() {
         = Drawer('Raphael')
        this.el = 

        // this.render();
      },

      render : function() {
      },

      addfigure : function(figure){

      }

    });

    return BoardView;
  }
);
