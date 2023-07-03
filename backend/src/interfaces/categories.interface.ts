export interface ICategories {
  nameCategory:
    | "conveniencia"
    | "golosinas"
    | "bebidas"
    | "limpieza"
    | "refrigerados"
    | "no perecederos";
  description: string;
  photo: string;
}

export type TCategoriesPhoto = Omit<
  ICategories,
  "nameCategory" | "description"
>;
