import './singleUser.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../services/getData';
import { useDispatch } from 'react-redux';
import { getUserAction } from '../../store/userSlice';
import { Loading } from '../../components/loading/Loading';
import { ViewSingleUser } from '../../components/viewSingleUser/ViewSingleUser';
import { FormUser } from '../../components/formUser/FormUser';

type Props = {
  component: string;
};

export function SingleUser({ component }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  const paramName = Object.keys(params)[0]!;
  const paramValue = Object.values(params)[0]!;

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    getSingleUser(paramValue).then((data) => {
      if (!cancel) {
        dispatch(getUserAction(data));
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
        {component === 'form' ? <FormUser></FormUser> : <ViewSingleUser></ViewSingleUser>}
      </div>
    </div>
  );
}
