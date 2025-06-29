// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const { initDb } = require('./data/database');
const booksRoutes = require('./routes/books');
const reviewsRoutes = require('./routes/reviews'); 
const usersRoutes = require('./routes/users');
const genresRoutes = require('./routes/genres');

const { swaggerUi, swaggerSpec } = require('./swagger');
const { isAuthenticated } = require('./middleware/authenticate');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(cors({
    origin: 'https://books-reviews-club.onrender.com',
    credentials: true
}));

app.use(express.json());

// Sessions
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes (protegidas)
app.use('/books', booksRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', usersRoutes);
app.use('/genres', genresRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    withCredentials: true
  }
}));

// Login
app.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Callback
app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

// Logout
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Start
initDb().then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
        console.log(`Swagger docs at http://localhost:${port}/api-docs`);
      });
    }
  });
  
  module.exports = app;