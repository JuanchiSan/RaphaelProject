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
    figureModel : 'models/figure.model',
    circleModel : 'models/circle.model',
    rectangleModel : 'models/rectangle.model',
    arcModel: 'models/arc.model',
    composedFigModel: 'models/composedfig.model',

    //views
    mainView : 'views/main.view',
    figureView : 'views/figure.view',
    paperView : 'views/paper.view',
    circleView : 'views/circle.view',
    rectangleView : 'views/rectangle.view',
    arcView : 'views/arc.view',
    composedView : 'views/composed.view',
    arcBuilderView : 'views/arcbuilder.view',

    //config file:
    config: 'config/config'
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
