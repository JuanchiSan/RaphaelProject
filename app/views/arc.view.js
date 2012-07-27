define(
  [
  'underscore',
  'backbone',
  'jquery',
  'circleModel',
  'circleView',
  'arcModel'
  ],
  function(_, Backbone, $, CircleModel, CircleView, ArcModel) {
    'use strict';
    var ArcView = Backbone.View.extend({

      events: {
        'mouseover': 'over',
        'mouseout': 'out',
        //'dblclick': 'addBreak',
        'click': 'select',
        'dblclick': 'erase'
      },

      //arrowStr: "M150.6,102.5 L170.6,92.5 L163.06,102.5 L170.6,112.5 L150.6,102.5",
      arrowStr: 'M21.871,9.814 15.684,16.001 21.871,22.188 18.335,25.725 8.612,16.001 18.335,6.276z',

      dragOps: {
        start: function(x, y, event) {
          this.ox = this.type === 'rect' ? window.parseInt(this.attr('x')) : window.parseInt(this.attr('cx'));
          this.oy = this.type === 'rect' ? window.parseInt(this.attr('y')) : window.parseInt(this.attr('cy'));

          var NewPoint = function(x, y){
            return {
              getCenter: function(){
                return {x: x, y: y};
              }
            };
          };

          // keep reference to the oldest victim
          this.victim = this.mapModel.get(this.movingSource);

          // just move the correct source
          if (this.movingSource === 'from') {
            var newSource = this.mapModel.get('to');
            this.mapModel.set({'from': newSource });
            this.mapModel.set({'to': new NewPoint(event.offsetX, event.offsetY) });
          }
          else{
            this.mapModel.set({'to': new NewPoint(event.offsetX, event.offsetY) });
          }
        },

        move: function(dx, dy) {
          var att = (this.type === 'rect') ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
          //var att = {'x': parseInt(this.attr('x')) + 2, 'y': parseInt(this.attr('y')) - 2 };
          this.attr(att);

          var NewPoint = function(x, y){
            return {
              getCenter: function(){
                return {x: x, y: y};
              }
            };
          };

          // to keep track of the place where the figure is
          //  so in this way if figure move (by drag) backbone model of the figure update its position...
          var mx = (this.type === 'rect')? att.x: att.cx;
          var my = (this.type === 'rect')? att.y: att.cy;
          this.mapModel.set({'to': new NewPoint(mx, my) });
        },

        up: function(event) {
          var newTo = this.paper.getElementsByPoint(event.offsetX, event.offsetY);

          console.log(event);
          console.log(newTo);

          if (!newTo[1]) {
            // no shapes in the last drop position, so restoring to connect to the old shape
            this.mapModel.set({'to': this.victim });
          }
          else {
            this.mapModel.set({'to': newTo[1].mapModel });
          }
        }
      },

      initialize : function(obj, paper) {
        _.bindAll(this, 'render', 'addBreak', 'out', 'over', 'select', 'newTo', 'newFrom', 'erase', 'rebindFrom', 'rebindTo', 'animNewConnection', 'showRemovingArc');
        this.model.get('from').bind('change', this.newFrom);
        this.model.get('to').bind('change', this.newTo);
        this.model.bind('change:from', this.rebindFrom);
        this.model.bind('change:to', this.rebindTo);
        this.model.bind('destroy', this.erase);

        this.paper = paper;
        this.render();
      },

      render : function() {
        this.connection(this.model.get('from'), this.model.get('to'));
        //this.graphicElem.drag( this.dragOps.move, this.dragOps.start, this.dragOps.up);
      },

      /*
       * Makes the connection and renderizes it with Raphael...
       */
      connection: function (obj1, obj2) {
        // new path to folow:
        var myPath = 'm' + obj1.getCenter().x + ',' + obj1.getCenter().y +
        ' L' + obj2.getCenter().x + ',' + obj2.getCenter().y;

        if (this.graphicElem) {
          this.graphicElem.attr({path: myPath});
          //this.graphicElem.animate({path: myPath}, 0, 'lineal');

          // var from_x = this.model.get('from').getCenter().x - this.model.get('from').get('radious');
          // var from_y = this.model.get('from').getCenter().y - this.model.get('from').get('radious');
          // this.fromIcon.attr({cx: from_x, cy: from_y});
          // this.fromIcon.mapModel = this.model.get('from');

          // var to_x = this.model.get('to').getCenter().x - this.model.get('to').get('radious');
          // var to_y = this.model.get('to').getCenter().y - this.model.get('to').get('radious');
          // this.toIcon.attr({cx: to_x, cy: to_y});
          // this.toIcon.mapModel = this.model.get('to');
        }
        else {
          /*
           * Generating a new path graphic element
           */

          this.graphicElem = this.paper.path( myPath );
          this.graphicElem.attr({'stroke-width': this.model.get('width'), stroke: this.model.get('color')});
          this.graphicElem.toBack();

          this.arrow = this.paper.path(this.arrowStr);
          this.arrow.attr({stroke: 'none', fill: 'gray'});
          //this.arrow.transform('t 21.871,9.814');
          //var angle = this.paper.raphael.angle(this.model.get('from').x, this.model.get('from').y, this.model.get('to').x, this.model.get('to').y);
          //console.log('angle: ' + angle);

          // getting the middle of the arc:
          // var arrowPos2 = this.graphicElem.getPointAtLength(this.graphicElem.getTotalLength() / 2 );
          // this.arrow.transform('T ' + arrowPos2.x + ',' + arrowPos2.y + ' R ' + (arrowPos2.alpha-180));

          this.graphicElem.mapModel = this.model;

          this.el = this.graphicElem.node;
          this.$el = $(this.graphicElem.node);

          /*
           * Adding two icons in the path sides to alow to drag each side of the path to a new shape
           */
          // var fromPoint_x = this.model.get('from').getCenter().x - this.model.get('from').get('radious');
          // var fromPoint_y = this.model.get('from').getCenter().y - this.model.get('from').get('radious');
          // this.fromIcon = this.paper.circle(fromPoint_x, fromPoint_y, 10);
          // this.fromIcon.attr({fill: 'red'});
          // this.fromIcon.mapModel = this.model;
          // this.fromIcon.paper = this.paper;
          // // The movingSource is used to draw the path without the victim.
          // this.fromIcon.movingSource = 'from';
          // this.fromIcon.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);

          // var toPoint_x = this.model.get('to').getCenter().x - this.model.get('to').get('radious');
          // var toPoint_y = this.model.get('to').getCenter().y - this.model.get('to').get('radious');
          // this.toIcon = this.paper.circle(toPoint_x, toPoint_y, 10);
          // this.toIcon.attr({fill: 'red'});
          // this.toIcon.mapModel = this.model;
          // this.toIcon.paper = this.paper;
          // // The movingSource is used to draw the path without the victim.
          // this.toIcon.movingSource = 'to';
          // this.toIcon.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);

          // // initialy the icons are not showed (only when selected)
          // this.hideIcons();
        }

        var arrowPos = this.graphicElem.getPointAtLength(this.graphicElem.getTotalLength() / 2 );
        this.arrow.transform('T ' + (window.parseInt(arrowPos.x) - 15) + ',' + (window.parseInt(arrowPos.y) - 16) + ' r ' + (arrowPos.alpha - 180));
      },

      newTo: function() {
        // if to have changed, it is needed to observe at the new model...
        this.model.get('to').bind('change', this.render );
        this.render();
      },

      newFrom: function() {
        this.model.get('from').bind('change', this.render );
        this.render();
      },

      over : function() {
        if (!this.model.isSelected){
          this.graphicElem.attr({'stroke': 'white', 'stroke-width': 4});
        }
      },

      out : function() {
        if (!this.model.isSelected){
          this.graphicElem.attr({'stroke-width': this.model.get('width'), stroke: this.model.get('color')});
        }
      },

      addBreak: function(event) {
        var figPoint = new CircleModel({x:event.offsetX, y:event.offsetY, radious:5, color: 'black'});
        var figPointView = new CircleView({model: figPoint}, this.paper);

        var oldTo = this.model.get('to');
        this.model.set({'to': figPoint});
        figPoint.bind('change', this.render );

        var newPath = new ArcModel({'from': figPoint, 'to': oldTo});
        var newPathView = new ArcView({model: newPath}, this.paper);
      },

      select: function() {
        if (!this.model.isSelected) {
          this.graphicElem.attr({'stroke': 'red', 'stroke-width': 4});
          this.model.isSelected = true;
          // this.showIcons();
          //this.graphicElem.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);
        }
        else {
          this.graphicElem.attr({'stroke-width': this.model.get('width'), stroke: this.model.get('color')});
          this.model.isSelected = false;
          // this.hideIcons();
        }
      },

      showIcons: function() {
        this.fromIcon.show();
        this.fromIcon.animate({'opacity': 1}, 300);
        this.toIcon.show();
        this.toIcon.animate({'opacity': 1}, 300);
      },

      hideIcons: function() {
        this.fromIcon.animate({'opacity': 0}, 600, this.fromIcon.hide() );
        this.toIcon.animate({'opacity': 0}, 300, this.toIcon.hide() );
      },

      /*
       * To delet this view and its Raphael element.
       */
      erase: function() {
        this.graphicElem.remove(); // remove from DOM.
        this.arrow.remove();
        //this.showRemovingArc();
        var myPath = 'm' + this.model.get('from').getCenter().x + ',' + this.model.get('from').getCenter().y;

        this.graphicElem.animate({path: myPath, stroke: 'red'}, 300, 'bounce',
          function() {
            this.animate({stroke: 'gray'});
            this.remove();
          }, this
        );
      },

      showRemovingArc: function() {
        var myPath = 'm' + this.model.get('from').getCenter().x + ',' + this.model.get('from').getCenter().y;

        this.graphicElem.animate({path: myPath, stroke: 'red'}, 300, 'bounce',
          function() {
            this.animate({stroke: 'gray'});
          }
        );
      },

      // the arc has changed the 'from' element, so it is needed a rebind
      rebindFrom: function() {
        this.model.get('from').bind('change', this.newFrom);
        this.animNewConnection(this.model.get('from'), this.model.get('to'));
      },
      // the arc has changed the 'to' element, so it is needed a rebind
      rebindTo: function() {
        this.model.get('to').bind('change', this.newTo);
        this.animNewConnection(this.model.get('from'), this.model.get('to'));
      },

      animNewConnection: function (obj1, obj2) {
        this.graphicElem.attr({path: 'm' + obj1.getCenter().x + ',' + obj1.getCenter().y});

        // new path to folow:
        var myPath = 'm' + obj1.getCenter().x + ',' + obj1.getCenter().y +
        ' L' + obj2.getCenter().x + ',' + obj2.getCenter().y;

        this.graphicElem.animate({path: myPath, stroke: '#29F900', 'stroke-width':6}, 400, '<',
          function() {
            this.animate({stroke: 'gray', 'stroke-width':4});
          }
        );
      }

    });

    return ArcView;
  }
);
