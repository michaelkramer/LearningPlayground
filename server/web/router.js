const path = require('path');
const {httpServer} = require('distraught');

// addCache('est' {connection: process.env.REDIS_URL}); // optional: if you want to use caching
const {contextMiddleware} = require('./middlewares/context');
const {homeController} = require('./controllers/home');

const server = httpServer({
  publicPath: path.join(__dirname, 'public'),
  viewPath: path.join(__dirname, 'views'),
  saveUninitialized: false,
});

// server.app.use(httpServer.cookieParser('your secret here'));
server.app.use('/', contextMiddleware);
server.app.use((req, res, next) => {
  // ...some middleware/plugin logic

  next();
});

/* WEB ROUTES */
server.app.get('/', homeController);

// authController.setAuthRoutes(server.app, server.passport);

server.start();
