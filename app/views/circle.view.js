define(
  [
    'underscore',
    'backbone',
    'figureView',
    'jquery'
  ],
  function(_, Backbone, FigureView, $) {
    "use strict";
    var CircleView = FigureView.extend({

      events: {
        'mouseover': 'select',
        'mouseout': 'select',
        'mouseup': 'shake'
      },

      /*
       * Paper and circle atts shuld be defined on creation...
       */

      initialize : function(obj, paper) {
        _.bindAll(this, 'render', 'generateGraphicElem', 'shake');
        this.model.bind('change', this.render );

        this.paper = paper;
        this.render();

        this.model.set({'graphicElem': this.graphicElem});
      },

      generateGraphicElem : function() {
        var graphicElem = this.paper.circle( this.model.get('x'),
                                             this.model.get('y'),
                                             this.model.get('radious') );

        graphicElem.attr( {'fill': this.model.get('color'),
                           'stroke': this.model.get('stroke'),
                           'stroke-width': this.model.get('stroke-width')} );

        return graphicElem;
      },


      /*
       * redefne shake cause circle has no width and height
       */
      shake: function() {
        var mult = 1.2;//Math.random() * 3;
        var oldRadius = this.model.get('radious');
        var newRadius = oldRadius * mult;

        this.graphicElem.animate( { transform:"", opacity: 0.5, r: newRadius}, 80, "<",
          function() {
            this.animate( { transform:"", opacity: 1, r: oldRadius}, 80, "elastic" );
          }
        );
        //this.model.set({'width': newHeight});
      }



    });

    return CircleView;
  }
);
