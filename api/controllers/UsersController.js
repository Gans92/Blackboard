/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  registration: function(req,res){
    var role = req.param('role');
    var firstname = req.param('firstName');
    var lastname = req.param('lastName');
    var phone = req.param('phone');
    var email = req.param('username');
    var password = req.param('password');
    var confirmPswd = req.param('cpassword');
    if(!phone || !lastname || !email || !password || !confirmPswd || password != confirmPswd){
      return res.view('reg_failed', {'title': "Registration failed"});
    }else{
      Users.create({firstName: firstname, lastName: lastname, phone: phone, roleId: role}).exec(function(err, user){
        if (err) {
          return res.serverError(err);
        }
        user.save();

        Admin.create({userName: email, password: "", salt: "" , phone: phone, roleId: role}).exec(function(err, teacher){
          if (err) {
            return res.serverError(err);
          }
          teacher.setPassword(password);
          teacher.save();

        });
        return res.view('reg_success', {'title': "Registration Success"});
      });
    }
  },

  list: function(req, res) {
    Users.find({}).sort("createdAt").exec(function(err, users){
      if (err) {
        return res.negotiate(err);
      }
      return res.view('user_details', {users: users});
    });
  },

  profile: function(req, res) {
    var phone = req.session.user.phone;
    Admin.findOne({phone : phone}).exec(function(err, profile){
      if (err) {
        return res.negotiate(err);
      }
      Users.findOne({phone : phone}).exec(function(err, user) {
        if (err) {
          return res.negotiate(err);
        }
        return res.view('profile', {admin: profile, user: user});
      });
    });
  },

  profileUpdate: function(req,res){
    var phone = req.param('phone');
    var email = req.param('username');
    if(!phone || !email){
      return res.view('updation_failed', {'title': "Updation failed"});
    }else{
      Users.update({phone: phone},{userName: email}).exec(function(err, user){
        if (err) {
          return res.serverError(err);
        }
        //user.save();

        Admin.update({phone: phone},{userName: email}).exec(function(err, teacher){
          if (err) {
            return res.serverError(err);
          }
          //teacher.setPassword(password);
          //teacher.save();

        });
        return res.redirect('/course/list');
        //return res.view('reg_success', {'title': "Updation Success"});
      });
    }
  },
};

