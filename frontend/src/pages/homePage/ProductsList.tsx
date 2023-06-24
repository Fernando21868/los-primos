import { TProducts } from './types';

type Props = {
  products: TProducts[];
};

export function ProductsList({ products }: Props) {
  return (
    <ul className="list-none">
      {products.map((product) => (
        <li key={product.nameCategory} className="border-b py-4">
          <h3 className="text-slate-900 font-bold">{product.description}</h3>
          <p className=" text-slate-900 ">{product.photo}</p>
        </li>
      ))}
    </ul>
  );
}
