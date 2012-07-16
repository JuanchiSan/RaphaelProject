define(
  [
    'underscore',
    'backbone',
    'hbs',
    'jquery',
    'text!templates/detail.tpl.html'
  ],
  function(_, Backbone, Handlebars, $, tpl) {

    var DetailView = Backbone.View.extend({

      // el: $('#dialog'),

      template: Handlebars.compile(tpl),

      events: {
        'click #exit' : 'exit'
      },

      initialize: function(){
        _.bindAll(this, 'render', 'exit');
        this.model.bind('change', this.render() );
      },

      render: function(){
        this.$el.html( this.template( this.model.toJSON() ) ).trigger('create');
        return this;
      },

      exit: function() {
        $('#dialog').empty();
        $('#page').show();
      }
    });

    return DetailView;
  }
);