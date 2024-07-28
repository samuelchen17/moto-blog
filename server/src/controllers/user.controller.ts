import { Request, Response } from "express";
import User from "../models/user.model";

export const test = (req: Request, res: Response): void => {
  res.json({ message: "API working" });
};
