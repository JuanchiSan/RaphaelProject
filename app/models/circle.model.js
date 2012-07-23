define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    'use strict';
    var CircleModel = FigureModel.extend({
      defaults : {
        radius : Config.circleRadius
      }

    });
    return CircleModel;
   }
);