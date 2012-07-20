define([
  'backbone',
  'figureModel'
  ],
  function(Backbone, FigureModel){
    var RectangleModel = FigureModel.extend( {

      defaults: {
        width: 30,
        height: 30
      }

    });
    return RectangleModel;
   }
);