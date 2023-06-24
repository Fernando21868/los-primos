export interface IProducts {
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
