export interface IUsers {
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  password: string;
  repeatPassword: string;
  permissions: "cliente" | "gerente" | "empleado" | "administrador";
  phoneNumber: string;
  googleId?: string;
  sex?: string;
  profilePhoto?: string;
}

export type TUserProfilePhoto = Pick<IUsers, "profilePhoto">;
