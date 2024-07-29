import { Request, Response } from "express";
import User from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    // if name is similar, can just use else, username: username
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error: unknown) {
    res.status(500).json(error.message);
  }
};
