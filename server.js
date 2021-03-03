const express = require("express");
require("dotenv").config();
const session = require("express-session");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const { sessionRoutes, searchRoutes } = require("./routes/index");
const constants = require("./util/constants");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();

app.use(helmet());
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

const searchLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  handler: (req, res, next) => {
    if (req.session.user.username === constants.LUKE) {
      return next();
    }
    res.status(429).end("Search limit exhausted!");
  },
});

app.use("/session", sessionRoutes);
app.use("/search", isAuthenticated, searchLimiter, searchRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
