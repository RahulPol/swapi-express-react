const path = require("path");
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

// use the build output of the react app as your client
const publicPath = path.join(__dirname, "client/build");
app.use(express.static(publicPath));

app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

let searchLimiter = (req, res, next) => {
  next();
};

if (process.env.ENABLE_RATE_LIMIT == "true") {
  searchLimiter = rateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 15,
    handler: (req, res, next) => {
      if (req.session.user.username === constants.LUKE) {
        return next();
      }
      res.status(429).end("Search limit exhausted!");
    },
  });
}

app.use("/session", sessionRoutes);
app.use("/search", isAuthenticated, searchLimiter, searchRoutes);
// root path will serve the index html present in client folder.
app.get("/*", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
