import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashSync } from "bcryptjs";
import { errorHandler } from "../utils/error";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  // back up check to see all fields are filled
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }

  // this will auto-gen salt and hash at the same time
  const hashedPassword = hashSync(password, 10);

  // user User model to create newUser
  const newUser = new User({
    // if name is similar, can just use else,
    username, // username: username
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    // res.status(500).json({ message: error });
    next(error);
  }
};
