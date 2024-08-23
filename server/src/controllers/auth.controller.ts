import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { compareSync, hashSync } from "bcryptjs";
import { errorHandler } from "../utils/error";

export const register = async (
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
    res.json({ message: "Successfully registered" });
  } catch (error) {
    // res.status(500).json({ message: error });
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "") {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne();
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    } else {
      const validPassword = compareSync(password, validUser.password);
      if (!validPassword) {
        next(errorHandler(400, "Invalid Password"));
      }
    }
  } catch (error) {
    // res.status(500).json({ message: error });
    next(error);
  }
};
