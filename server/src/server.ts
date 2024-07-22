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
    console.log("Mongo connected");
  })
  .catch((error) => {
    console.log(error);
  });

router.use(morgan("dev"));

// parse the body
// allow the server to read incoming request and body in json format
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// api access policies
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
