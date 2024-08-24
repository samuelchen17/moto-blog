import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { compareSync, hashSync } from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";

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
  const { loginInput, password } = req.body;

  if (!loginInput || !password || loginInput === "" || password === "") {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({
      $or: [{ username: loginInput }, { email: loginInput }],
    });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: validUser._id }, jwtSecret);

    const validUserObj = validUser.toObject();
    // remove password being sent back to user
    const { password: pass, ...userWithoutPassword } = validUserObj;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    // res.status(500).json({ message: error });
    next(error);
  }
};
