// can separate this file into server.ts, app.ts and db.ts

import http from "http";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// server handling
const httpServer = http.createServer(app);

// connect to firebase admin
const serviceAccountKey = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

// mongodb setup using mongoose
// async await method, can separate into another file
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    console.log("Mongo connected");
  } catch (error) {
    console.error("Error connecting to Mongo", error);
    // exit the process with a failure code 1 if connection fails
    process.exit(1);
  }
};

connectDB();

// .then.catch method
// mongoose
//   .connect(config.mongo.url, config.mongo.options)
//   .then(() => {
//     console.log("Mongo connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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
