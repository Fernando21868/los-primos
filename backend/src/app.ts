import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { db } from "./models";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { auth } from "./config/passport";

const PORT = process.env.PORT || 8081;
auth(passport);
const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(express.json());

import("./routes/swagger.route").then((moduleRouter) => {
  app.use("/", moduleRouter.router);
});

import("./routes/users.route").then((moduleRouter) => {
  app.use("/", moduleRouter.router);
});

import("./routes/categories.route").then((moduleRouter) => {
  app.use("/", moduleRouter.router);
});

import("./routes/auth.route").then((moduleRouter) => {
  app.use("/", moduleRouter.router);
});

import("./routes/products.route").then((moduleRouter) => {
  app.use("/", moduleRouter.router);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`DB Connected and server running on ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
