// server.js
// This file will take care of the express and node set up

var express  = require("express");
var app 	 = express();
var mongoose = require("mongoose");
var passport = require ('passport');
var User     = require ('./models/user');
// var flash = require('connect-flash');
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

app.set('view engine', 'html');
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat'} ));

// app.use(express.cookieSession('secret'));
// app.use(flash());

// app.use(express.cookieSession());
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000,function(){
console.log('App is listening on port %d', this.address().port);
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
	
	// The problem with using this one is it is not hash
// passport.use(new LocalStrategy(
//   function(username,password, done) {
//   	console.log ("Got to passport Strategy");
//   	console.log (username);
//   		console.log (password);
//     User.findOne({ username: username }, function(err, user) {
// 	console.log ("inside find one");
// 	if (err) { 
// 		console.log ("error");
// 		return done(err); }
// 	if (!user) {
// 	console.log ("not valid user");
// 	return done(null, false, { message: 'Incorrect username.' });

// 	}
// 	if (user.password != password) { 
// 		return done(null, false, { message: 'Invalid password' }); 
// 	}
//       console.log ("Got user");
//       return done(null, user);
//     });
//   }
// ));
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
// app.post('/loginREST',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login'})
// );

app.get('/loginREST', function(req, res){
   console.log(res);
  res.send({ user: req.user});
});


// app.post('/loginREST', function(req, res){
// 	//I expect inputs in an array
// 	console.log("here");
// 	passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),function(req, res) {
//     	res.redirect('/');
// 	};
// 	console.log(req.body);
// });

app.post('/loginREST', passport.authenticate('local', {session: true}), function(req, res) {
  
  res.send({user:res.user}); 
  
});

// app.get('/loginREST', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });
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