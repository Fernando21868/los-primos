import './single.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleCategory, getSingleUser } from './getProductsUsers';
import { Form } from '../../components/form/Form';

// Redux
import { useDispatch } from 'react-redux';
import {
  categoryAction,
  getCategoryAction,
  resetCategoryAction,
  resetHeadingsCategoryAction,
  setHeadingsCategoryAction,
} from '../../store/categorySlice';
import {
  getUserAction,
  resetHeadingsUserAction,
  resetUserAction,
  setHeadingsUserAction,
  userAction,
} from '../../store/userSlice';
import { Loading } from '../../components/loading/Loading';
import { ViewSingleCategory } from '../../components/viewSingleCategory/ViewSingleCategory';
import { ViewSingleUser } from '../../components/viewSingleUser/ViewSingleUser';

type Props = {
  component: string;
};

export function Single({ component }: Props) {
  const [isLoading, setIsLoading] = useState(true);
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
            dispatch(
              setHeadingsCategoryAction(
                component === 'form'
                  ? {
                      nameCategory: 'Nombre Categoria',
                      description: 'Descripcion',
                      photo: 'Imagen',
                    }
                  : {
                      nameCategory: 'Nombre Categoria',
                      description: 'Descripcion',
                      photo: 'Imagen',
                      createdAt: 'Fecha Creacion',
                      updatedAt: 'Fecha Actualizacion',
                    },
              ),
            );
            dispatch(resetHeadingsUserAction());
            dispatch(categoryAction());
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
            dispatch(
              setHeadingsUserAction(
                component === 'form'
                  ? {
                      dni: 'DNI',
                      firstName: 'Nombre',
                      lastName: 'Apellido',
                      password: 'Contraseña',
                      repeatPassword: 'Repetir Contraseña',
                      email: 'Email',
                      phoneNumber: 'Telefono',
                      profilePhoto: 'Foto',
                      sex: 'Sexo',
                    }
                  : {
                      dni: 'DNI',
                      firstName: 'Nombre',
                      lastName: 'Apellido',
                      email: 'Email',
                      phoneNumber: 'Telefono',
                      profilePhoto: 'Foto',
                      sex: 'Sexo',
                      createdAt: 'Fecha Creacion',
                      updatedAt: 'Fecha Actualizacion',
                    },
              ),
            );
            dispatch(resetHeadingsCategoryAction());
            dispatch(userAction());
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
  }, [paramName, paramValue, dispatch, component]);

  if (isLoading) {
    return <Loading content="Cargando Formulario" isLoading={isLoading}></Loading>;
  }

  return (
    <div className="single">
      <div className="single__container">
        {component === 'form' ? (
          <Form formLabel={formLabel}></Form>
        ) : component === 'viewCategory' ? (
          <ViewSingleCategory></ViewSingleCategory>
        ) : component === 'viewUser' ? (
          <ViewSingleUser></ViewSingleUser>
        ) : null}
      </div>
    </div>
  );
}
