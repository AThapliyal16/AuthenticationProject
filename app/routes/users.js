var express = require('express');
var router = express.Router();
const connection = require('../db_config');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var moment = require('moment');
// var nodemailer = require('nodemailer');
// const commonController = require("../controller/v1.commonController");
var SMScontroller = require('./SMS');
// var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getusers', function (req, res, next) {
  var getCommentQ = "SELECT * FROM `users`";

  connection.query(getCommentQ, function (err, result) {
    if (err) {
      console.log(err);
      res.send({ status: 0, data: err, message: "Unable to get the user list.." });
    }
    else {
      res.send(result);
    }
  })
});

router.get('/getusers/:email', function (req, res, next) {
  var getCommentQ = "SELECT * FROM `users` WHERE email ='" + req.params.email + "'";
  console.log("27...", getCommentQ);

  connection.query(getCommentQ, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Unable to get the User Detail....");
    }
    else {
      var response = {
        succeess: true,
        message: "Found Entry.....",
        data: result
      }
      res.send(response);
    }
  })
});


router.get('/getusersbyid/:id', function (req, res, next) {
  var Query = "SELECT * FROM `users` WHERE ID ='" + req.params.id + "'";
  console.log("48...", Query);

  connection.query(Query, function (err, result) {
    if (err) {
      console.log(err);
      res.send("Unable to get the User Detail....");
    }
    else {
      var response = {
        succeess: true,
        message: "Found Entry.....",
        data: result
      }
      res.send(response);
    }
  })
});

router.post('/newuser', function (req, res) {
  // console.log("25...password",req.body.password);
  var hashed_password = md5(req.body.password.toString())
  console.log("hash.......", hashed_password);

  var commentQ = "Insert into `Users`(Title,FirstName,LastName,Email,DOB,Contact,City,Password,ConfirmPassword) VALUES ('" + req.body.title + "','" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.email + "','" + req.body.dob + "','" + req.body.contact + "','" + req.body.city + "','" + hashed_password + "','" + req.body.confirmPassword + "')";

  connection.query(commentQ, function (err, result, fields) {
    console.log(commentQ);
    if (err) {
      console.log(err);
      res.send({ status: 0, data: err, message: "There is an error while saving data...." });
    }
    else {
      let token = jwt.sign({ data: result }, 'secret')
      SMScontroller.NewUserMail(req.body.Email);
      var response = {
        succeess: true,
        message: "New Entry is added to list......",
        token: token,
        data: result
      }

      res.send(response);
    }
  })
});

router.post("/validateuser", function (req, response) {
  // let sqlquery1= "call loginuser(?,?)"
  console.log("50.....", req.body.Password)
  const hashed_password = md5(req.body.Password.toString());
  console.log("52....", hashed_password);
  var sql2 = "Select count(*)rowsnum from Users WHERE email ='" + req.body.Email + "' and password='" + hashed_password + "'"
  // connection.query(sqlquery1,[req.body.email,req.body], function(err, result,fields) {    
  connection.query(sql2, function (err, result, fields) {
    if (err) {
      var res = {
        status: 0,
        message: "Error occurred .....",
        data: err
      }
      response.send(res);
    }
    else if (result[0].rowsnum !== 0) {
      let token = jwt.sign({ data: result }, 'secret')
      // SMScontroller.sendMails(req.body.Email);
      SMScontroller.WelcomeMail(req.body.Email);
      var res = {
        status: 1,
        data: result,
        token: token,
        message: "Login Success"
      }
      response.send(res)
    }
    else {
      var res = {
        status: 2,
        data: result,
        message: "Login failed"
      }
      response.send(res)
    }
  })
});

router.post("/updateuser", function (req, res) {
  var dob=moment(req.body.DOB).format('YYYY-MM-DD');
  console.log("DOB......",dob);
console.log("REQ body.......",req.body.Email);
  var Query = "update users set Title='" + req.body.Title + "',FirstName='" + req.body.FirstName + "',LastName='" + req.body.LastName + "',Email='" + req.body.Email + "',DOB='" +dob+ "',Contact='" + req.body.contact + "',City='" + req.body.city + "' where ID='" + req.body.ID + "'";

  connection.query(Query, function (err, result) {

    if (err) {
      var response = {
        status: false,
        message: "Error occurred .....",
        data: err
      }
      res.send(response);
      console.log(err);
    }
    else {
      var response = {
        success: true,
        data: result,
        message: "Successfully updated"

      }
      console.log(result);
      res.send(response);
    }
  })
});

router.delete("/deleteuser/:id", function (req, res){

  var sql3 = "Delete from users where ID='" + req.params.id + "'"
    connection.query(sql3, function (err, result) {
    if (err) throw err
    res.send(result);
  });
})
// router.post("/SendSecurityMessage",  SMScontroller.sendMail);


module.exports = router;
