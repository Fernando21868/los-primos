import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getSingleUserService,
  getUsersService,
  updateUserService,
} from "../services/users.service";
import { IUsers } from "../interfaces/users.interface";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { userSchema } from "../utils/validationSchema.handler";

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers[]> | void> => {
  // #swagger.tags = ['users']
  try {
    const response = await getUsersService();
    if (!response) {
      throw createHttpError(404, "Users does not exists.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    next(createHttpError(500, "Error retrieving users."));
  }
};

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['users']
  try {
    const { idUser } = req.params;
    const response: IUsers | null = await getSingleUserService(idUser);
    if (!response) {
      throw createHttpError(404, "User does not exist.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid user id."));
      return;
    }
    next(err);
  }
};

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['users']
  try {
    const newUser: IUsers = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      permissions: req.body.permissions,
      phoneNumber: req.body.phoneNumber,
      googleId: req.body.googleId,
      sex: req.body.sex,
      profilePhoto: req.body.profilePhoto,
    };
    const result: IUsers = await userSchema.validateAsync(newUser);
    const response: IUsers | null = await createUserService(result);
    if (!response) {
      throw createHttpError(404, "User was not created.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err.name === "ValidationError")
      return next(createHttpError(422, err.message));
    next(err);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['users']
  try {
    const { idUser } = req.params;
    const newUser: IUsers = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      permissions: req.body.permissions,
      phoneNumber: req.body.phoneNumber,
      googleId: req.body.googleId,
      sex: req.body.sex,
      profilePhoto: req.body.profilePhoto,
    };
    const result: IUsers = await userSchema.validateAsync(newUser);
    const response: IUsers | null = await updateUserService(idUser, result);
    if (!response) {
      throw createHttpError(404, "User was not updated.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err.isJoi === true) err.status = 422;
    if (err instanceof mongoose.Error.CastError)
      return next(createHttpError(400, "Invalid user id."));
    next(err);
  }
};
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUsers> | void> => {
  // #swagger.tags = ['users']
  try {
    const { idUser } = req.params;
    const response: IUsers | null = await deleteUserService(idUser);
    if (!response) {
      throw createHttpError(404, "User was not deleted.");
    }
    return res.status(200).json(response);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof mongoose.Error.CastError) {
      next(createHttpError(400, "Invalid user id."));
      return;
    }
    next(err);
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
