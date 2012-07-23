define(
  [
    'jquery',
    'backbone',
    'raphael',
    'config'
  ],
  function($ ,Backbone, Raphael, Config) {
    'use strict';
    var FigureView = Backbone.View.extend({

      events: {

      },

      dragstart: function(){
      },

      dragmove: function(dx,dy){
      },

      dragup: function(){
      }

    });

    return FigureView;
  }
);