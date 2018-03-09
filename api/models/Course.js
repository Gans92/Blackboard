/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        course : { type: 'string' },

        description : {
          type: 'string'
        },

        status : { type: 'boolean' },

        course_parentId : {
          model: 'course'
        }

    },

   /*afterDestroy: function(course, cb){

        Course.destroy({course_parentId: course.id}).exec(function(err){
            if (err) {
                console.log(err);
            }
        });
        Document.destroy({courseId: course.id}).exec(function(err){
            if (err) {
                console.log(err);
            }
        });
        Messages.destroy({group: course.id}).exec(function(err){
            if (err) {
                console.log(err);
            }
        });
        cb();
    },*/

  /*if (lecture.transcript_url) {
                console.log("Deleting ", path.basename(lecture.transcript_url));
                uploader.removeFile(lecture.transcript_url);
            }*/

    /*afterDestroy: function(courses, cb){
        for (course of courses) {
          course.destroy({course_parentId: course.id}).exec(function(err){
                if (err) {
                    console.log(err);
                }
            });
        }

        cb();
    },*/
};

