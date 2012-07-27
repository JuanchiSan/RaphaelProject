define([
  'backbone',
  'figureModel'
  ],
  function(Backbone, FigureModel){
    var Layer = Backbone.Model.extend({

      defaults: {
        upLayer: null,    // layer obove this one.
        bottomLayer: null,// layer down this one.
        elementsList: [], // a list with the elements inside this layer:
        posStart: 0,      // the start position of the layer
        size: 20,         // layer size
        layout: 'horizontal'
      },

      initialize: function() {
        // if (this.layout === 'horizontal') {
        //   this.moveAxe = 'x';
        // }
        // else {
        //   this.moveAxe = 'y';
        // }
      },

      addElement: function(element) {
        this.elementsList.push(element);
        // shuld it set the element position? yes, I think... but How??
        //element.set({x: , y: });
      },

      shiftLayer: function(offset) {
        // update the new start of the layer
        this.posStart += offset;
        // update the position of each element in this layer
        this.elementsList.forEach( function(elem) {
          if (this.layout === 'horizontal') {
            var oldX = elem.get('x');
            elem.set({'x': oldX + offset});
          }
          else {
            var oldY = elem.get('y');
            elem.set({'y': oldY + offset});
          }
        });
        // tell the bottom layer to give me space
        this.bottomLayer.shiftLayer(offset);
      }

    });
    return Layer;
  }
);
