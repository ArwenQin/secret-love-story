import express from 'express';
import cors from 'cors'




import "dotenv/config";

import session from "express-session";
import UsersController from "./users/users-controller.js";
import PostController from "./posts/post-controller.js";

import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

const allowedOrigins = [process.env.FRONTEND_URL,'https://secret-love-story.netlify.app'];
const app = express();
app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          return callback(new Error('error'), false);
        }
        return callback(null, true);
      },
      credentials: true
    })
);

app.use(express.json());

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


UsersController(app);
PostController(app);

const port = process.env.PORT || 4000;
app.listen(process.env.PORT || 4000);
