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
        'dblclick': 'addBreak',
        'click': 'select'
      },

      dragOps: {
        // start: function(mousex, mousey, event) {
        //   //console.log({ getCenter: function(){return {x: event.offsetX, y: event.offsetY};} });
        //   this.victim = this.mapModel.get('to');
        //   var NewPoint = function(x, y){
        //     return {
        //       getCenter: function(){
        //         return {x: x, y: y};
        //       }
        //     };
        //   };

        //   this.mapModel.set({'to': new NewPoint(event.offsetX, event.offsetY) });
        //   //event.stopPropagation();
        //   //this.mapModel.set({'to': 12});
        //   //this.animate({'fill': 'red'}, 300);
        // },

        // move: function(dx, dy) {
        //   var to = this.mapModel.get('to');
        //   console.log(dx + ", " + dy);
        //   this.mapModel.set({'to': { getCenter: function(){return {x: to.getCenter().x + dx, y: to.getCenter().y + dy};} } });
        // },

        // up: function() {
        //   this.animate({'fill-opacity': '1'}, 300);
        //   this.toBack();
        // }
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

          // keep rference to the oldest victim
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
          var att = (this.type === 'rect') ?
          {x: this.ox + dx, y: this.oy + dy}
          : {cx: this.ox + dx, cy: this.oy + dy};
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
        _.bindAll(this, 'render', 'addBreak', 'out', 'over', 'select');
        this.model.get('from').bind('change', this.render );
        this.model.get('to').bind('change', this.render );
        this.model.bind('change', this.render );

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

           this.graphicElem.mapModel = this.model;

           this.el = this.graphicElem.node;
           this.$el = $(this.graphicElem.node);

          /*
           * Adding two icons in the path sides to alow to drag each side of the path to a new shape
           */
           var fromPoint_x = this.model.get('from').getCenter().x - this.model.get('from').get('radious');
           var fromPoint_y = this.model.get('from').getCenter().y - this.model.get('from').get('radious');
           this.fromIcon = this.paper.circle(fromPoint_x, fromPoint_y, 10);
           this.fromIcon.attr({fill: 'red'});
           this.fromIcon.mapModel = this.model;
           this.fromIcon.paper = this.paper;
          // The movingSource is used to draw the path without the victim.
          this.fromIcon.movingSource = 'from';
          this.fromIcon.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);

          var toPoint_x = this.model.get('to').getCenter().x - this.model.get('to').get('radious');
          var toPoint_y = this.model.get('to').getCenter().y - this.model.get('to').get('radious');
          this.toIcon = this.paper.circle(toPoint_x, toPoint_y, 10);
          this.toIcon.attr({fill: 'red'});
          this.toIcon.mapModel = this.model;
          this.toIcon.paper = this.paper;
          // The movingSource is used to draw the path without the victim.
          this.toIcon.movingSource = 'to';
          this.toIcon.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);

          // initialy the icons are not showed (only when selected)
          this.hideIcons();
        }
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
          this.showIcons();
          //this.graphicElem.drag(this.dragOps.move, this.dragOps.start, this.dragOps.up);
        }
        else {
          this.graphicElem.attr({'stroke-width': this.model.get('width'), stroke: this.model.get('color')});
          this.model.isSelected = false;
          this.hideIcons();
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
      }

    });

return ArcView;
}
);
