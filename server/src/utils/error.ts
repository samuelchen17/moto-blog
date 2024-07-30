import { ICustomError } from "../interface/user.interface";

export const errorHandler = (
  statusCode: number,
  message: string
): ICustomError => {
  const error = new Error() as ICustomError;
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
