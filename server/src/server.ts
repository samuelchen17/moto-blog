import http from "http";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

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
  .connect(process.env.MONGODB_URL, config.mongo.options)
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

// Routes

// Error handling
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

// listen for requests
httpServer.listen(config.server.port, () => {});
