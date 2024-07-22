import http from "http";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";

const router = express();

// server handling
const httpServer = http.createServer(router);

// connect to firebase admin
let serviceAccountKey = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

// connect to mongo
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info("Mongo connected");
  })
  .catch((error) => {
    logging.error(error);
  });
