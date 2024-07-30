import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "../database/index.database";
import userRoutes from "../routes/user.route";
import authRoutes from "../routes/auth.route";
import { ICustomError } from "../interface/user.interface";

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

// Routes
// user routes
app.use("/api/user", userRoutes);
// auth routes
app.use("/api/auth", authRoutes);

// Error handling
// Error handling for 404
app.use((req, res, next) => {
  const error = new Error("404 error");
  res.status(404).json({
    message: error.message,
  });
});

// add global error handler
app.use(
  (
    err: ICustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
);

export default app;
