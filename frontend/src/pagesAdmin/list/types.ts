export type TProducts = {
  nameCategory:
    | 'conveniencia'
    | 'golosinas'
    | 'bebidas'
    | 'limpieza'
    | 'refrigerados'
    | 'no perecederos';
  description: string;
  photo: string;
};

export type TUsers = {
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
};
