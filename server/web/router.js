const {httpServer, addCache} = require('distraught');
 
// addCache('est', {connection: process.env.REDIS_URL}); // optional: if you want to use caching
 
const homeController = require('./controllers/home');
 
const server = httpServer({
  publicPath: path.join(__dirname, 'public'),
  viewPath: path.join(__dirname, 'views'),
  // findUserById(id: number) {
  //   return cache.default.getOrSet(`user-${id}`, fetchUserById.bind(null, id)); // Needed for passport middleware
  // },
});
 
server.app.use((req, res, next) => {
  // ...some middleware/plugin logic
  next();
});
 
/* WEB ROUTES */
server.app.get('/', homeController.get);
 
// authController.setAuthRoutes(server.app, server.passport);
 
server.start();