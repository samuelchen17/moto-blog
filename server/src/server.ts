import http from "http";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";
import cors from "cors";

const app = express();

// server handling
const httpServer = http.createServer(app);

// connect to firebase admin
let serviceAccountKey = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

// connect to mongo using mongoose
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Logging
// HTTP request logger, logs details about incoming HTTP requests such as request method, URL, status code, response time etc.
app.use(morgan("dev"));

// parse the body
// allow the server to read incoming request and body in json format
// for applications that handle form submissions from an HTML form
app.use(express.urlencoded({ extended: true }));
// for applications that handle JSON payloads, typically sent by SPAs or RESTful APIs
app.use(express.json());

// api access policies
// cors policy
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

// Routes

// Errpr handling
// Error handling for 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

// add global error handler

// listen for requests
httpServer.listen(config.server.port, () => {});
