define(
  [
    'underscore',
    'backbone',
    'figureView',
    'jquery',
    'paperModel'
  ],
  function(_, Backbone, FigureView, $, PaperModel) {
    "use strict";
    var RectangleView = FigureView.extend({

      events: {
//        mouseover: "selected",
        //mouseout: "notSelected",
//        click: "shake"
      },

      initialize : function() {
        _.bindAll(this, 'render', 'selected', 'shake', 'notSelected');
        this.model.bind('change', this.render());

        this.paper = PaperModel.canvas;

        this.element = this.paper.rect( this.model.get('x'),
                                            this.model.get('y'),
                                            this.model.get('width'),
                                            this.model.get('height') );
        this.element.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up);

        this.el = this.element.node;
        this.$el = $(this.element.node);

        this.render();
      },

      render : function() {
        if (this.element) {
          this.element.attr( {fill: 'orange', stroke: '5'} );
        }
      },

      selected: function() {
        // show a high path or something...
        var r = Math.floor(Math.random()*100),
            g = Math.floor(Math.random()*100),
            b = Math.floor(Math.random()*100);
        this.element.attr({fill: 'rgb(' + r + '%,' + g + '%,' + b + '%)'});
      },

      notSelected: function() {
        // var r = Math.floor(Math.random()*100),
        //     g = Math.floor(Math.random()*100),
        //     b = Math.floor(Math.random()*100);
        // this.element.attr({fill: 'rgb(' + r + '%,' + g + '%,' + b + '%)'});
      },

      shake: function() {
        var mult = Math.random() * 3;
        var oldHeight = this.model.get('width');
        var oldWidht = this.model.get('height');
        var newHeight = oldHeight * mult;
        this.element.animate({ transform:"", opacity: 0.5, stroke: 'none', width: newHeight, height: newHeight}, 200, "elastic",
          function() {
            this.animate( { transform:"", opacity: 1, stroke: '1', width: oldWidht, height: oldHeight}, 400, "elastic" );
          }
        );
        //this.model.set({'width': newHeight});
      }

    });

    return RectangleView;
  }
);
