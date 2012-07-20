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
    var CircleView = FigureView.extend({

      events: {
//        'click': 'selected'
      },

      /*
       * Paper and circle atts shuld be defined on creation...
       */

      initialize : function() {
        _.bindAll(this, 'render', 'selected');
        this.model.bind('change', this.render );

        this.paper = PaperModel.canvas;

        this.element = this.paper.circle( this.model.get('x'),
                                          this.model.get('y'),
                                          this.model.get('radious') );
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
      }

    });

    return CircleView;
  }
);
