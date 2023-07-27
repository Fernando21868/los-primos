import { useEffect, useState } from 'react';
import './list.css';
import { getCategories, getProducts, getUsers } from '../../services/getProductsUsers';
import { Props, Table } from '../../components/table/Table';
import { Loading } from '../../components/loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { getProductsAction, resetProductsAction } from '../../store/productSlice';
import { getCategoriesAction, resetCategoriesAction } from '../../store/categorySlice';
import { getUsersAction, resetUsersAction } from '../../store/userSlice';

export function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('');
  const [headings, setHeadings] = useState<Props['headings']>({});
  const permissions = useSelector((state: RootState) => state.userAuth.permissions);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);
  const pathname = window.location.pathname.split('/').pop()!;

  useEffect(() => {
    if (permissions === 'empleado' && pathname === 'users') {
      navigate('/admin');
    }
    let cancel = false;
    switch (pathname) {
      case 'categories':
        getCategories().then((data) => {
          if (!cancel) {
            setHeadings({
              photo: 'Imagen categoria',
              nameCategory: 'Nombre Categoria',
              description: 'Descripcion',
              actions: 'Acciones',
            });
            dispatch(getCategoriesAction(data));
            dispatch(resetUsersAction());
            dispatch(resetProductsAction());
            setPage('Categorias');
            setIsLoading(false);
          }
        });
        break;
      case 'users':
        getUsers().then((data) => {
          if (!cancel) {
            setHeadings({
              dni: 'DNI',
              profilePhoto: 'Foto de perfil',
              firstName: 'Nombre',
              lastName: 'Apellido',
              email: 'Email',
              phoneNumber: 'Telefono',
              actions: 'Acciones',
            });
            dispatch(getUsersAction(data));
            dispatch(resetCategoriesAction());
            dispatch(resetProductsAction());
            setPage('Usuarios');
            setIsLoading(false);
          }
        });
        break;
      case 'products':
        getProducts().then((data) => {
          if (!cancel) {
            setHeadings({
              name: 'Nombre Producto',
              category: 'Nombre Categoria',
              photo: 'Imagen Producto',
              price: 'Precio',
              stock: 'Stock Disponible',
              brand: 'Marca',
              actions: 'Acciones',
            });
            dispatch(getProductsAction(data));
            dispatch(resetCategoriesAction());
            dispatch(resetUsersAction());
            setPage('Productos');
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
  }, [pathname]);

  if (isLoading) {
    return <Loading content="Cargando Tabla" isLoading={isLoading}></Loading>;
  }

  return (
    <div className={`list ${lightDarkMode ? 'dark' : ''}`}>
      <div className="list__container">
        <Table page={page} headings={headings}></Table>
      </div>
    </div>
  );
}
