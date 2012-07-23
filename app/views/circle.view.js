define(
  [
    'jquery',
    'backbone',
    'raphael',
    'circleModel',
    'config'
  ],
  function($ ,Backbone, Raphael, CircleModel) {
    'use strict';
    var CircleView = Backbone.View.extend({

      el : '#figure_container',

      model : CircleModel,

      events: {

      },

      initialize : function(board) {
        this.model = new CircleModel();
        this.model.set({'x' : 10, 'y' : 10, 'circleRadius' : 10});
        this.render(board);
        //ver cuando cargo la collection de figures
      },

      render : function(board) {
        var circle = board.paper.circle(this.model.get('x'), this.model.get('y'), this.model.get('circleRadius'));
      },

      addfigure : function(figure){

      }

    });

    return CircleView;
  }
);
