/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res) {
        var name = req.param('name');
        var des = req.param('des');
        if (!name) {
            return res.badRequest('Course name is required!');
        }

        var courseId = req.param('id');
        var parentId = req.param('parentId');
        if ( courseId === '0') {
            Course.create({course: name, description: des, status: true, course_parentId: parentId}, function(err, course){
                if (err) {
                    return res.negotiate(err);
                }
                return res.redirect('/course/list');
            });
        } else {
            Course.update({id: parseInt(courseId)},{course: name, description: des}, function(err, updated){
                if (err) {
                    return res.negotiate(err);
                }
                return res.redirect('/course/list');
            });
        }
    },

    list: function(req, res) {
        var role = req.session.user.roleId;
        Course.find({course_parentId:0}).sort("id DESC").exec(function(err, courses){
            if (err) {
                return res.negotiate(err);
            }
          if(role == 1) {
            return res.view('student_course_list', {courses: courses});
          }else{
            return res.view('course_list', {courses: courses});
          }
        });
    },

    edit: function(req, res) {
        var courseId = req.param('id');
        var role = req.session.user.roleId;
        Course.findOne({id: courseId}, function(err, course){
            if (err) {
                return res.negotiate(err);
            }

            Course.find({course_parentId: courseId}).sort("id ASC").exec(function(err, subCourses){
                if (err) {
                    return res.negotiate(err);
                }

                Document.find({courseId:courseId}).sort("id ASC").exec(function(err, documents){
                  if (err) {
                    return res.negotiate(err);
                  }
                  if(role == 1) {
                    return res.view('student_subcourse_details', {title: 'View Details', c: course, lectures: subCourses, lecture: undefined, documents: documents, doc: undefined});
                  }else{
                    return res.view('edit_course', {title: 'Edit Details', c: course, lectures: subCourses, lecture: undefined, documents: documents, doc: undefined});
                  }

                });

            });

        });
    },

    delete: function(req, res) {
      var courseId = req.param('id');
      Course.destroy({id: courseId}, function(err, course){
        if (err) {
          return res.negotiate(err);
        }
        return res.redirect('/course/list');
      });

      /*var courseId = req.param('id');
      Course.findOne({id: courseId}, function(err, main) {
        if (err) {
          return res.negotiate(err);
        }
        Course.find({course_parentId:courseId}).exec(function(err, courses){
          courses.add(main);
          Document.destroy({courseId : courses.id},function(err, doc) {
            if (err) {
              return res.negotiate(err);
            }
            Course.destroy({course_parentId: courseId, id: courseId}, function(err, course){
              if (err) {
                return res.negotiate(err);
              }
              return res.redirect('/course/list');
            });
          });
        });
      });*/

    }

};

