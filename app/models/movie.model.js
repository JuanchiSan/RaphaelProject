/**

 *
 * @authors  Juan Ignacio Saenz <juan.saenz@globant.com>
 */

 define([
    'backbone',
    'jquery'
  ], function(Backbone, $) {


    var movieModel = Backbone.Model.extend({

      defaults : {
        'id': null,
        'title': null,
        'year': null,
        'mpaa_rating': null,
        'runtime': null,
        'release_dates': null,
        'ratings': null,
        'synopsis': null,
        'posters': null,
        'abridged_cast': [null],
        'alternate_ids': null,
        'links': null
      }

    });

    return movieModel;
  }
);