define(
  [
    'jquery',
    'backbone',
    'raphael',
    'rectModel',
    'config'
  ],
  function($ ,Backbone, Raphael, RectModel) {
    'use strict';
    var RectView = Backbone.View.extend({

      el : '#figure_container',

      model : RectModel,

      events: {

      },

      initialize : function(board) {
        this.model = new RectModel();
        this.model.set({'x' : 100, 'y' : 10, 'rectWidth' : 50, 'rectHeight' : 30, 'rectRadius' : 10});
        this.render(board);
        //ver cuando cargo la collection de figures
      },

      render : function(board) {
        var rect = board.paper.rect(this.model.get('x'), this.model.get('y'), this.model.get('rectWidth'), this.model.get('rectHeight'), this.model.get('rectRadius'));
      },

      addfigure : function(figure){

      }

    });

    return RectView;
  }
);
