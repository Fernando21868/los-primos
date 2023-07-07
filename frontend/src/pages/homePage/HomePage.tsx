import { useEffect, useState } from 'react';
import { getProducts } from './getProducts';
import { TProducts } from './types';
import { ProductsList } from './ProductsList';
import { Loading } from '../../components/loading/Loading';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<TProducts[]>([]);

  useEffect(() => {
    let cancel = false;
    getProducts().then((data) => {
      if (!cancel) {
        setProducts(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  if (isLoading) {
    return <Loading content="Cargando" isLoading={isLoading} />;
  }
  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">Posts</h2>
      <ProductsList products={products} />
    </div>
  );
}
