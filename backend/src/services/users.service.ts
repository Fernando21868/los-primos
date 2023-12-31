import { IUsers, TUserProfilePhoto } from "../interfaces/users.interface";
import { db } from "../models";

const getUsersService = async (): Promise<IUsers[] | null> => {
  const response = await db.users.find({});
  return response;
};

const getSingleUserService = async (idUser: string): Promise<IUsers | null> => {
  const response = await db.users.findById({ _id: idUser });
  return response;
};

const createUserService = async (user: IUsers): Promise<IUsers | null> => {
  const response = await db.users.create(user);
  return response;
};

const updateUserServiceProfilePhoto = async (
  idUser: string,
  profilePhoto: TUserProfilePhoto
): Promise<IUsers | null> => {
  const response = await db.users.findOneAndUpdate(
    { _id: idUser },
    profilePhoto,
    { new: true }
  );
  return response;
};

const updateUserService = async (
  idUser: string,
  user: IUsers
): Promise<IUsers | null> => {
  const response = await db.users.findOneAndUpdate({ _id: idUser }, user, {
    new: true,
  });
  return response;
};

const deleteUserService = async (idUser: string): Promise<IUsers | null> => {
  const response = await db.users.findOneAndDelete({ _id: idUser });
  return response;
};

export {
  getUsersService,
  getSingleUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  updateUserServiceProfilePhoto,
};
