define([
  'backbone',
  'figureModel',
  'config'
  ],
  function(Backbone, FigureModel, Config){
    var CircleModel = FigureModel.extend({
      defaults : {
        radius : Config.circleRadius;
      }

    });
    return CircleModel;
   }
);