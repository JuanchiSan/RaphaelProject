define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    'use strict';
    var RectModel = FigureModel.extend({
      defaults : {
        width : Config.rectWidth,
        height : Config.rectHeight,
        radius : Config.rectRadius
      }

    });
    return RectModel;
   }
);