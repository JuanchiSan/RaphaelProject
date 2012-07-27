define(
  [
    'underscore',
    'backbone',
    'figureView',
    'jquery'
  ],
  function(_, Backbone, FigureView, $) {
    'use strict';
    var RectangleView = FigureView.extend({

      events: {
        'mouseover': 'select',
        'mouseout': 'select',
        'mouseup': 'shake'
        //'mouseover': 'selectAndChangeColor'
      },

      initialize : function(obj, paper) {
        _.bindAll(this, 'render', 'generateGraphicElem', 'changeColor', 'notSelected', 'selectAndChangeColor');
        this.model.bind('change', this.render);
        this.paper = paper;
        this.render();
        this.model.set({'graphicElem': this.graphicElem});
      },

      generateGraphicElem : function() {
        var graphicElem = this.paper.rect( this.model.get('x'),
                                           this.model.get('y'),
                                           this.model.get('width'),
                                           this.model.get('height'),
                                           5 );

        graphicElem.attr( {'fill': this.model.get('color'),
                           'stroke': this.model.get('stroke'),
                           'stroke-width': this.model.get('stroke-width')} );

        this.el = graphicElem.node;
        this.$el = $(graphicElem.node);

        return graphicElem;
      },

      selectAndChangeColor: function() {
        this.select();
        this.changeColor();
      },

      changeColor: function() {
        // show a high path or something...
        var r = Math.floor(Math.random()*100),
            g = Math.floor(Math.random()*100),
            b = Math.floor(Math.random()*100);
        this.graphicElem.attr({fill: 'rgb(' + r + '%,' + g + '%,' + b + '%)'});
      },

      notSelected: function() {
        // var r = Math.floor(Math.random()*100),
        //     g = Math.floor(Math.random()*100),
        //     b = Math.floor(Math.random()*100);
        // this.graphicElem.attr({fill: 'rgb(' + r + '%,' + g + '%,' + b + '%)'});
      }

    });

    return RectangleView;
  }
);
