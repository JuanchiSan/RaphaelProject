define([
  'backbone'
  ],
  function(Backbone){
    var FigureModel = Backbone.Model.extend({

      defaults: {
        title: 'myFigure',
        x: 0,
        y: 0,
        color: 'orange',
        stroke: 'gray',
        'stroke-width': 3
      },

      getCenter: function() {
        // Abstract method...
        // RE-IMPLEMENT as necesary in particular models...
        return {x: this.get('x'), y: this.get('y')};
      }

      // setGraphicElem: function(graphicElem) {
      //   this.graphicElem = graphicElem;
      //   var changePos = function() {
      //     this.x = this.graphicElem.getBBox().x;
      //     this.y = this.graphicElem.getBBox().y;
      //   };
      //   this.graphicElem.bind('change', changePos);
      // }

    });
    return FigureModel;
  }
  );