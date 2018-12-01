const express = require("express");
//const redis   = require("redis");
const app = express();


const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");

//const RedisStore = require('connect-redis')(session);
//const client  = redis.createClient();

const router_beauty_salon = require('./routes/beauty_salon');
const router_authorization = require('./routes/authorization');
const router = require('./routes/index');


const ws = require('./ws')

const PORT = process.env.PORT || 3010;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('../../public'));

app.use(session({
    //store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl: 600}),
    secret: 'supersecret',
    resave: true,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no'))
  }
  next()
})

app.use('/api/beauty_salon', router_beauty_salon);
app.use('/api', router_authorization);
app.use('/', router);


const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
