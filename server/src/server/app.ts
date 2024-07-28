import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "../database/index.database";
import userRoutes from "../routes/user.route";

const app = express();

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
// CORS policy
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

// connect to Mongo
connectDB();

// user routes
app.use("/api/user", userRoutes);

// Error handling
// Error handling for 404
app.use((req, res, next) => {
  const error = new Error("404 error");
  res.status(404).json({
    message: error.message,
  });
});

// add global error handler

export default app;
