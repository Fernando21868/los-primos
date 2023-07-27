import './singleProduct.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleProduct } from '../../services/getData';
import { useDispatch } from 'react-redux';
import { getProductAction } from '../../store/productSlice';
import { Loading } from '../../components/loading/Loading';
import { FormProduct } from '../../components/formProduct/FormProduct';
import { ViewSingleProduct } from '../../components/viewSingleProduct/ViewSingleProduct';
import { getCategories } from '../../services/getProductsUsers';
import { getCategoriesAction } from '../../store/categorySlice';

type Props = {
  component: string;
};

export function SingleProduct({ component }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  const paramName = Object.keys(params)[0]!;
  const paramValue = Object.values(params)[0]!;

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    getSingleProduct(paramValue).then((data) => {
      if (!cancel) {
        dispatch(getProductAction(data));
        getCategories().then((data) => {
          dispatch(getCategoriesAction(data));
        });
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, [paramName, paramValue, dispatch, component]);

  if (isLoading) {
    return <Loading content="Cargando formulario" isLoading={isLoading}></Loading>;
  }

  return (
    <div className="single">
      <div className="single__container">
        {component === 'form' ? (
          <FormProduct></FormProduct>
        ) : (
          <ViewSingleProduct></ViewSingleProduct>
        )}
      </div>
    </div>
  );
}
