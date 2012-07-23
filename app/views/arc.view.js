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
    "use strict";
    var ArcView = Backbone.View.extend({

      events: {
        'mouseover': 'over',
        'mouseout': 'out',
        'click': 'addBreak'
      },

      initialize : function(obj, paper) {
        _.bindAll(this, 'render', 'addBreak', 'out', 'over');
        this.model.get('from').bind('change', this.render );
        this.model.get('to').bind('change', this.render );
        this.model.bind('change', this.render );

        this.paper = paper;
        this.render();
      },

      render : function() {
        this.connection(this.model.get('from'), this.model.get('to'));
      },

      /*
       * Makes the connection and renderizes it with Raphael...
       */
      connection: function (obj1, obj2) {
        //var bb1 = obj1.getBBox(), bb2 = obj2.getBBox();

        // new path:
        var myPath = "m" + obj1.getCenter().x + "," + obj1.getCenter().y +
                     " L" + obj2.getCenter().x + "," + obj2.getCenter().y;

        if (this.graphicElem) {
            this.graphicElem.attr({path: myPath});
        }
        else {
            this.graphicElem = this.paper.path( myPath );
            this.graphicElem.attr({'stroke-width': this.model.get('width'), stroke: this.model.get('color')});
            this.graphicElem.toBack();

            this.el = this.graphicElem.node;
            this.$el = $(this.graphicElem.node);
        }

        // if (obj1.line && obj1.from && obj1.to) {
        //   line = obj1;
        //   obj1 = line.from;
        //   obj2 = line.to;
        // }
        // var bb1 = obj1.getBBox(),
        //   bb2 = obj2.getBBox(),
        //   p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        //   {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        //   {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        //   {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        //   {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        //   {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        //   {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        //   {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        //   d = {}, dis = [];
        // for (var i = 0; i < 4; i++) {
        //   for (var j = 4; j < 8; j++) {
        //     var dx = Math.abs(p[i].x - p[j].x),
        //     dy = Math.abs(p[i].y - p[j].y);
        //     if ((i === j - 4) || (((i !== 3 && j !== 6) || p[i].x < p[j].x) && ((i !== 2 && j !== 7) || p[i].x > p[j].x) && ((i !== 0 && j !== 5) || p[i].y > p[j].y) && ((i !== 1 && j !== 4) || p[i].y < p[j].y))) {
        //       dis.push(dx + dy);
        //       d[dis[dis.length - 1]] = [i, j];
        //     }
        //   }
        // }
        // var res;
        // if (dis.length === 0) {
        //   res = [0, 4];
        // } else {
        //   res = d[Math.min.apply(Math, dis)];
        // }
        // var x1 = p[res[0]].x,
        //     y1 = p[res[0]].y,
        //     x4 = p[res[1]].x,
        //     y4 = p[res[1]].y;
        // dx = Math.max(Math.abs(x1 - x4) / 2, 10);
        // dy = Math.max(Math.abs(y1 - y4) / 2, 10);
        // var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        //     y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        //     x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        //     y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
        // var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
        // if (line && line.line) {
        //     line.bg && line.bg.attr({path: path});
        //     line.line.attr({path: path});
        // } else {
        //     var color = (typeof line === "string") ? line : "#000";
        //     return {
        //         bg: bg && bg.split && this.paper.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
        //         line: this.paper.path(path).attr({stroke: color, fill: "none"}),
        //         from: obj1,
        //         to: obj2
        //     };
        // }
       },

       over : function() {
        this.graphicElem.attr({'stroke': 'white', 'stroke-width': 4});
       },

       out : function() {
        this.graphicElem.attr({'stroke': 'gray', 'stroke-width': 4});
       },

      addBreak: function(event) {
        var figPoint = new CircleModel({x:event.offsetX, y:event.offsetY, radious:5, color: 'black'});
        var figPointView = new CircleView({model: figPoint}, this.paper);

        var oldTo = this.model.get('to');
        this.model.set({'to': figPoint});
        figPoint.bind('change', this.render );

        var newPath = new ArcModel({'from': figPoint, 'to': oldTo});
        var newPathView = new ArcView({model: newPath}, this.paper);
      }

    });

    return ArcView;
  }
);
