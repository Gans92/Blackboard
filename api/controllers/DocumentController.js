var uploader = require('../services/uploader');
var path = require('path');

module.exports = {
    edit: function(req, res) {
        var id = req.param('id');
        Document.findOne({id: id}, function(err, doc){
            if (err) {
                return res.negotiate(err);
            }
            Course.findOne({id: doc.courseId}, function(err, course){
              if (err) {
                return res.negotiate(err);
              }

              return res.view('edit_video', {doc: doc, c: course});

            });
        });
    },

    delete: function(req, res) {
        var docId = req.param('id');
      Document.destroy({id: parseInt(docId)}, function(err, docs){
            if (err) {
                return res.negotiate(err);
            }
            var doc = docs[0];
            return res.redirect('/course/' + doc.courseId + '/edit');
        });
    },

  docUpdate: function(req, res){
        var link = req.param('doclink');
        var title = req.param('title');
        var docId = req.param('id');
        var lectureId = req.param('lecture');


        if (!title || !lectureId  || !req.file('video')) {
            return res.badRequest('Video title | file is required!');
        }

        var uploadFile = function(doc){
            uploader.uploadFile(req, 'video', function(folder){
                var videoURL = '/files/' + path.basename(folder);

                if (doc.url) {
                    uploader.removeFile(doc.url);
                }

              Document.update({id: doc.id}, {url: videoURL}, function(err, doc){
                    if (err) {
                        return res.negotiate(err);
                    }
                    return res.redirect('/course/' + lectureId +'/edit');
                });
            }, function(err){
                if (err) {
                    return res.negotiate(err);
                } else {
                    return res.redirect('/course/' + lectureId +'/edit');
                }
            });
        };

        if ( docId === '0') {
          Document.create({name: title, description: "NA", courseId: lectureId, link: link, status: true, url: ''}, function(err, doc){
                if (err) {
                    return res.negotiate(err);
                }
                uploadFile(doc);
            });
        } else {
          Document.update({id: parseInt(docId)}, {name: title, link: link}, function(err, doc){
                    if (err) {
                        return res.negotiate(err);
                    }
                    uploadFile(doc[0]);
            });
        }

    }

};
