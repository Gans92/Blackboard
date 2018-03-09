/**
 * Document.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uploader = require('../services/uploader');
var path = require('path');

module.exports = {

    attributes: {

        name : {
          type: 'string',
          required: true
        },

        description : {
          type: 'string'
        },

        link : {
          type: 'string'
        },

        url: {
          type: 'string'
        },

        courseId : {
            model: 'course',
            required: true
        },

        status : {
            type: 'boolean'
        }


    },

  afterDestroy: function(doc, cb){
      if (doc.url) {
        console.log("Deleting ", path.basename(doc.url));
        uploader.removeFile(doc.url);
      }
    cb();
  }

};

