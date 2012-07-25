define([
  'backbone',
  'figureModel'
  ],
  function(Backbone, FigureModel){
    var RectangleModel = FigureModel.extend( {

      moredefaults: {
        width: 30,
        height: 30
      },

      initialize: function() {
        //this.set(this.defaults);
      },

      /*
       * Reimplementing getCenter function (x and y are the left up corner)
       */
       getCenter: function() {
        return {
          x: (window.parseInt(this.get('x')) + window.parseInt(this.get('width')) / 2),
          y: (window.parseInt(this.get('y')) + window.parseInt(this.get('height')) / 2)
        };
      }

    });
    return RectangleModel;
  }
  );