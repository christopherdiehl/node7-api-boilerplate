const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config')
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

exports.createServer = function() ***REMOVED***
  var app = express();
  var port = config.port || 8080;
  var router = express.Router();

  mongoose.connect(config.db);
  app.use(bodyParser.urlencoded(***REMOVED***extended : true***REMOVED***));
  app.use(bodyParser.json());

  /*Routes*/
  //test route
  router.get('/', function(req,res) ***REMOVED***
    res.json(***REMOVED***message: 'welcome to node api boilerplate!'***REMOVED***);
  ***REMOVED***);

  router.route('/authenticate').
    post(authController.authenticate);

  router.route('/health').
    get(function(req,res) ***REMOVED*** res.sendStatus(200) ***REMOVED***);

  // Create endpoint handlers for /users
  router.route('/users').
    post(userController.postUsers).
    get(authController.isAuthenticated,userController.getUsers);

  router.route('/protected/user/:username').
    get(userController.getUser).
    post(userController.postUser);



  app.all('/api/protected/*', authController.isAuthenticated);
  app.use('/api',router);

  console.log('Listening on '+port);
  app.listen(port);
***REMOVED***