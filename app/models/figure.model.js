define([
  'backbone',
  'config'
  ],
  function(Backbone,Config){
    var FigureModel = Backbone.Model.extend({
      defaults : {
        x : Config.x,
        y : Config.y
      }

    });
    return FigureModel;
   }
);