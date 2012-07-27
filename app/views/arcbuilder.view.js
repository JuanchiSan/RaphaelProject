define(
  [
  'underscore',
  'backbone',
  'jquery',
  'arcModel',
  'arcView',
  'circleModel'
  ],
  function(_, Backbone, $, ArcModel, ArcView, CircleModel) {
    'use strict';
    var ArcBuilderView = Backbone.View.extend({

      /*
       * Drag operations on start, move and up a figure
       */
      dragOps: {
        start: function(x, y, event) {
          if (!this.arcs) {
            this.arcs = [];
          }
          // this offsets are used to put the 'to' of the arc in the mouse pointer.
          this.offsetX = event.offsetX - this.from.getCenter().x;
          this.offsetY = event.offsetY - this.from.getCenter().y;
          this.newArc = new ArcModel({'from': this.from, 'to': new CircleModel({x: event.offsetX, y: event.offsetY}) });
          this.newArcView = new ArcView({'model': this.newArc}, this.paper);
          this.arcs.push({arc: this.newArc, arcView: this.newArcView});
        },

        move: function(dx, dy) {
          var att = (this.type === 'rect') ?
          {x: window.parseInt(this.newArc.get('from').getCenter().x) + dx + this.offsetX, y: window.parseInt(this.newArc.get('from').getCenter().y) + dy + this.offsetY}:
          {cx: window.parseInt(this.newArc.get('from').getCenter().x) + dx + this.offsetX, cy: window.parseInt(this.newArc.get('from').getCenter().y) + dy + this.offsetY};

          this.newArc.get('to').set({x: att.cx, y: att.cy});
        },

        up: function(event) {
          // var overFig = this.paper.getElementByPoint(event.layerX, event.layerY);

          // no luck with "getElementByPoint", so: lets loop over each figure (?)
          var overElement = false;

          this.paper.forEach(
            function(elem) {
              if ((elem.type === 'circle' || elem.type === 'rect') && (elem.mapModel)) {
                //console.log("type1: " + elem.type);
                //console.log(elem);
                if (elem.paper.raphael.isPointInsideBBox(elem.getBBox(), event.offsetX, event.offsetY)) {
                  //console.log("type: " + elem.type);
                  this.newArc.get('to').destroy(); // destroy the helper element 'to'
                  this.newArc.set({'to': elem.mapModel});
                  overElement = true;
                  return true; // to stop looping over elements...
                }
              }
            }, this // local reference.
          );

          // drop it like it's hot
          if (!overElement) {
            this.newArc.destroy();
          }

        }
      },

      events: {
      },

      /*
       * Paper shuld be defined on creation
       * base: Associated model to the arcMaker, so the arc maker will do an arc starting from that 'base'
       */
      initialize : function(obj, paper, baseComponent ) {
        _.bindAll(this, 'render', 'shake');
        this.model.bind('change', this.render);
        //this.container.bind('change', this.render);
        this.baseComponent = baseComponent;
        this.paper = paper;
        this.render();
      },

      render: function() {
        if (!this.graphicElem) {
          this.graphicElem = this.paper.circle( this.model.get('x'), this.model.get('y'), this.model.get('radius') );
          this.graphicElem.toFront();
          this.graphicElem.attr( {'fill': this.model.get('color'),
            'stroke': this.model.get('stroke'),
            'stroke-width': this.model.get('stroke-width')
          });

          this.graphicElem.from = this.baseComponent;
          this.graphicElem.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);
          //this.graphicElem.attr({cursor: 'move'});
          //this.graphicElem.mapModel = this.model;

          // El 'el' de la vista se obtiene de la biblioteca raphael...
          this.el = this.graphicElem.node;
          this.$el = $(this.graphicElem.node);
        }
        else {
          this.graphicElem.attr({cx: this.model.get('x'), cy: this.model.get('y')});
          //this.graphicElem.animate({}, 1000, "lineal", function(){this.toFront();} );
          this.graphicElem.toFront();
        }
      },

      shake: function() {
        // no shake! please...
      }

    });

    return ArcBuilderView;
  }
);
