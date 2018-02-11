var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var router = express.Router();

var User = require('../models/user');
var Fee = require('../models/fee');
var Result = require('../models/results');
var Exam = require('../models/exam');

var env = require('../env');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: env.nodemailerhost,
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: env.email,
    pass: env.password
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  // return res.sendFile(path.join(__dirname + '/views/index.html'));
});

/**
 * Register new User
 */
router.post('/user/register', function (req, res, next) {
  //Check if User Exists
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      //Hash Password here
      let hash = bcrypt.hashSync(req.body.password, 10);

      //Create New User
      var new_user = new User();
      new_user.student_name = req.body.student_name;
      new_user.reg_number = req.body.reg_number;
      new_user.image_url = req.body.image_url;
      new_user.email = req.body.email;
      new_user.course = req.body.course;
      new_user.password = hash;

      new_user.save(function (err, user) {
        if (err) {
          res.send(err);
        }
        res.json(user);

        // Send Email to the Registred User
        let mailOptions = {
          from: '"School Monitoring System" <njoki.m.muturi@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "School Monitoring System", // Subject line
          // text: 'Hello world ?', // plain text body
          html:
            "<b>Hello " +
            user.student_name +

            "</b>, <p>Thanks for registering on School Monitoring System. You can now look at school fees, exam dates and personnal profile easily." // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message %s sent: %s", info.messageId, info.response);
        });

      });
    }
    if (user) {
      //User exists, Login
      res.send({
        message: 'User Exists, Please Login!'
      });
    }
  });
});

/**
 * Login existing User
 */
router.post('/user/login', function (req, res, next) {
  //Find if the user exists here, we use their email
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.send(err);
    }
    //No user
    if (!user) {
      res.send({
        message: 'No user is registered'
      });
    }
    //User is found
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //Password is correct
        res.json(user)
      } else {
        //Wrong Password
        res.send({
          message: 'Wrong Password!'
        });
      }
    }
  });
});

/**
 * Save Fees Paid!!!
 */
router.post('/user/fee/pay', function (req, res, next) {
  Fee.findOne({ reg_number: req.body.reg_number }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      var fee = new Fee();
      fee.reg_number = req.body.reg_number;
      fee.paid = req.body.paid;
      fee.save(function (err, fee) {
        if (err) {
          res.send(err);
        }
        if (fee) {
          res.json(fee);
        }
      });
    }
  });
});

/**
 * Returns ALL Fees saved
 */
router.get('/all/fees', function (req, res, next) {
  Fee.find(function (err, fees) {
    if (err) {
      res.send(err);
    }
    res.json(fees);
  });
});

/**
 * Save Results!!!
 */
router.post('/user/results/save', function (req, res, next) {
  Result.findOne({ reg_number: req.body.reg_number }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      var result = new Result();
      result.reg_number = req.body.reg_number;
      result.unit = req.body.unit;
      result.points = req.body.points;
      result.save(function (err, result) {
        if (err) {
          res.send(err);
        }
        if (result) {
          res.json(result);
        }
      });
    }
  });
});

/**
 * Returns ALL Results saved
 */
router.get('/all/results', function (req, res, next) {
  Result.find(function (err, results) {
    if (err) {
      res.send(err);
    }
    res.json(results);
  });
});

/**
 * Save Exams!!!
 */
router.post('/user/exam/save', function (req, res, next) {
  var exam = new Exam();
  exam.exam = req.body.exam;
  exam.date = req.body.date;
  exam.save(function (err, exam) {
    if (err) {
      res.send(err);
    }
    if (exam) {
      res.json(exam);
    }
  });
});

/**
 * Returns ALL Exams saved
 */
router.get('/all/exams', function (req, res, next) {
  Exam.find(function (err, exams) {
    if (err) {
      res.send(err);
    }
    res.json(exams);
  });
});

module.exports = router;
