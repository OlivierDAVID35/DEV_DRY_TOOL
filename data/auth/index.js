require('dotenv').config();
const express = require('express');
const session = require('express-session');
const loggedRouter = require('./app/routers/logged');
const publicRouter = require('./app/routers/public');
const loginCheck = require('./app/middelwares/loginCheck')

const PORT = process.env.PORT || 5000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true
}));

app.use((req, res, next) => {
    if(req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

app.use("/members", loginCheck, loggedRouter);
app.use(publicRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`, `http://localhost:${PORT}`);
});