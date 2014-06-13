// server.js
// This file will take care of the express and node set up

var express  = require("express");
var app 	 = express();
var mongoose = require("mongoose");
var passport = require ('passport');
var User     = require ('./models/user');
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://leapuser:leappass@alex.mongohq.com:10008/leapcare'); 
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error to mongoose'));
	db.once('open', function callback () {
		console.log("Connected to mongoose");
	});

//process.env.port || 
app.set('port', 3000);
app.use(express.json({limit: '50mb'}));
app.use(express.static(__dirname)); 
app.use(express.bodyParser()); 

// app.use(express.cookieSession());
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000,function(){
console.log('App is listening on port %d', this.address().port);
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route

// 1. Authenticate user
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// passport.use(new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { 
//         return done(err); 
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
 
//  app.post('/loginREST',
//   passport.authenticate('local', {
//     successRedirect: '/activities',
//     failureRedirect: '/'

//   })
// );
// app.post('/loginREST', function(req, res){
// 	//I expect inputs in an array
// 	console.log("here");
// 	passport.use(new LocalStrategy(
// 	  function(username,password, done) {
// 	    User.findOne({ username: req.body.username }, function(err, user) {
// 	      if (err) { return done(err); }
// 	      if (!user) {
// 	        console.log ("not valid user");
// 	        return done(null, false, { message: 'Incorrect username.' });
	        
// 	      }
// 	      if (!user.validPassword(req.body.password)) {
// 	        console.log ("not valid password");
// 	        return done(null, false, { message: 'Incorrect password.' });
	        
// 	      }
// 	      console.log ("Got user");
// 	      return done(null, user);
// 	    });
// 	  }
// 	));
// 	console.log(req.body);
// });

  app.post('/loginREST', passport.authenticate('local', {session: true}), function(req, res) {
      
      if (req.body.activity){
        console.log("i am in the first if");
        res.redirect('/activities/' +req.body.activity);

      }
      else{
        if (req.body.assessment){
        	console.log("i am in the second else");
           res.redirect('/assessments/' +req.body.assessment);
        }
        else{  
          console.log("i am in the last else");
          res.send(req.user); 

        }
      }
      console.log("i am here");
  });

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});