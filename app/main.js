/**
 * RequireJS bootstrap
 */
require.config({
  paths: {
    //libreries
    backbone : '../libs/backbone/backbone.amd',
    backbonemin : '../libs/backbone/backbone-min',
    jquery : '../libs/jquery/jquery-1.7.1.min',
    underscore : '../libs/underscore/underscore.amd',
    underscoremin : '../libs/underscore/underscore-min',
    eve : '../libs/raphael/eve',
    raphael : '../libs/raphael/raphael.amd',
    raphaelcore : '../libs/raphael/raphael.core',
    raphaelsvg : '../libs/raphael/raphael.svg',
    raphaelvml : '../libs/raphael/raphael.vml',
    text : '../libs/require/text',
    hbs : '../libs/hbs/handlebars-wrapper',
    //routers
    approuter : 'router/approuter',
    //models
    paperModel : 'models/paper.model',
    //views
    mainView : 'views/main.view',
    paperView : 'views/paper.view'
  },

  priority: ['jquery', 'raphael', 'underscore', 'backbone'],
  //template
  hbs : {
    disableI18n : true,
    templateExtension : 'hbs'
  },
  //Load jquery plugins
  shim: {
    'raphael' : {
      deps : ['jquery'],
      exports : 'raphael'
    },
    'backbone' : {
      deps : ['underscore','jquery'],
      exports : 'backbone'
    }
  }
});

require(
  [
    'app'
  ],
  function(app) {
    app.init();
  }
);
