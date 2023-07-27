import './singleCategory.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleCategory } from '../../services/getData';
import { useDispatch } from 'react-redux';
import { getCategoryAction } from '../../store/categorySlice';
import { Loading } from '../../components/loading/Loading';
import { ViewSingleCategory } from '../../components/viewSingleCategory/ViewSingleCategory';
import { FormCategory } from '../../components/formCategory/FormCategory';

type Props = {
  component: string;
};

export function SingleCategory({ component }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  const paramName = Object.keys(params)[0]!;
  const paramValue = Object.values(params)[0]!;

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    getSingleCategory(paramValue).then((data) => {
      if (!cancel) {
        dispatch(getCategoryAction(data));
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
          <FormCategory></FormCategory>
        ) : (
          <ViewSingleCategory></ViewSingleCategory>
        )}
      </div>
    </div>
  );
}
