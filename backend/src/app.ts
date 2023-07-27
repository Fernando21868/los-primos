import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { db } from "./models";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { auth } from "./config/passport";
import * as categoriesRoutes from "./routes/categories.route";
import * as usersRoutes from "./routes/users.route";
import * as productsRoutes from "./routes/products.route";
import * as authRoutes from "./routes/auth.route";
import * as swaggerRoutes from "./routes/swagger.route";

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

app.use("/", categoriesRoutes.router);

app.use("/", usersRoutes.router);

app.use("/", productsRoutes.router);

app.use("/", authRoutes.router);

app.use("/", swaggerRoutes.router);

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
