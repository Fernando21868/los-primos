export interface IDates {
  createdAt: string;
  updatedAt: string;
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
  permissions: 'gerente' | 'empleado' | 'administrador';
  phoneNumber: string;
  googleId?: string;
  sex?: string;
  profilePhoto?: string;
}
