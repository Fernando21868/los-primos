import './single.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleCategory, getSingleUser } from './getProductsUsers';
import { Props } from '../../components/table/Table';
import { Form } from '../../components/form/Form';

// Redux
import { useDispatch } from 'react-redux';
import { categoryAction, getCategoryAction, resetCategoryAction } from '../../store/categorySlice';
import { getUserAction, resetUserAction, userAction } from '../../store/userSlice';

export function Single() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState<Props['headings']>({});
  const [formLabel, setFormLabel] = useState('');

  let params = useParams();
  const paramName = Object.keys(params)[0]!;
  const paramValue = Object.values(params)[0]!;

  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    let cancel = false;
    switch (paramName) {
      case 'categoryId':
        getSingleCategory(paramValue).then((data) => {
          if (!cancel) {
            setInputs({
              nameCategory: 'Nombre Categoria',
              description: 'Descripcion',
              photo: 'Imagen',
            });
            dispatch(categoryAction);
            dispatch(getCategoryAction(data));
            dispatch(resetUserAction());
            setFormLabel('Categorias');
            setIsLoading(false);
          }
        });
        break;
      case 'userId':
        getSingleUser(paramValue).then((data) => {
          if (!cancel) {
            setInputs({
              dni: 'DNI',
              firstName: 'Nombre',
              lastName: 'Apellido',
              password: 'Contraseña',
              repeatPassword: 'Repetir Contraseña',
              email: 'Email',
              phoneNumber: 'Telefono',
              profilePhoto: 'Foto',
              sex: 'Sexo',
            });
            dispatch(userAction);
            dispatch(getUserAction(data));
            dispatch(resetCategoryAction());
            setFormLabel('Usuarios');
            setIsLoading(false);
          }
        });
        break;
      default:
        break;
    }
    return () => {
      cancel = true;
    };
  }, [paramName, paramValue, dispatch]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="single">
      <div className="single__container">
        <Form formLabel={formLabel} inputs={inputs}></Form>
      </div>
    </div>
  );
}
