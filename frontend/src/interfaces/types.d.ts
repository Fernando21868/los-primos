export interface IDates {
  createdAt: string;
  updatedAt: string;
}

export interface IProducts extends IDates {
  _id: string;
  name: string;
  description: string;
  category: {
    nameCategory: string;
  };
  photo: string;
  price: number;
  stock: number;
  brand: string;
  expirationDate: string;
  barcode?: string;
  weight?: string;
  size?: string;
}

export interface ICategories extends IDates {
  _id: string;
  nameCategory:
    | 'conveniencia'
    | 'golosinas'
    | 'bebidas'
    | 'limpieza'
    | 'refrigerados'
    | 'no perecederos';
  description: string;
  photo: string;
}

export interface IUsers extends IDates {
  _id: string;
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  password: string;
  repeatPassword: string;
  permissions: 'cliente' | 'gerente' | 'empleado' | 'administrador';
  phoneNumber: string;
  googleId?: string;
  sex?: 'masculino' | 'femenino' | 'sin especificar';
  profilePhoto?: string;
}

export type TUserForm = Omit<
  IUsers,
  '_id' | 'permissions' | 'googleId' | 'profilePhoto' | 'createdAt' | 'updatedAt'
>;

export type TCategoryForm = Omit<ICategories, '_id' | 'photo' | 'createdAt' | 'updatedAt'>;

export type TProductForm = Omit<IProducts, '_id' | 'photo' | 'createdAt' | 'updatedAt'>;

export type TImageFile = {
  file: string;
};
