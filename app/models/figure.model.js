define([
  'backbone',
  'config'
  ],
  function(Backbone,Config){
    'use strict';
    var FigureModel = Backbone.Model.extend({
      defaults : {
        x : Config.x,
        y : Config.y
      }

    });
    return FigureModel;
   }
);