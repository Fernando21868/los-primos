import { useEffect, useState } from 'react';
import './list.css';
import { getCategories, getUsers } from './getProductsUsers';
import { ICategories, IUsers } from './types';
import { Props, Table } from '../../components/table/Table';

export function List() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('');
  const [headings, setHeadings] = useState<Props['headings']>({});

  const pathname = window.location.pathname.split('/').pop()!;

  useEffect(() => {
    let cancel = false;
    switch (pathname) {
      case 'categories':
        getCategories().then((data) => {
          if (!cancel) {
            setHeadings({
              photo: 'Imagen categoria',
              nameCategory: 'Nombre Categoria',
              description: 'Descripcion',
              // _id: 'ID',
              // createdAt: 'Creacion',
              // updatedAt: 'Actualizacion',
              actions: 'Acciones',
            });
            setCategories(data);
            setUsers([]);
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
              // _id: 'ID',
              // sex: 'Sexo',
              // createdAt: 'Creacion',
              // updatedAt: 'Actualizacion',
              actions: 'Acciones',
            });
            setUsers(data);
            setCategories([]);
            setPage('Usuarios');
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
    return <div>...Loading</div>;
  }

  return (
    <div className="list">
      <div className="list__container">
        <Table page={page} categories={categories} users={users} headings={headings}></Table>
      </div>
    </div>
  );
}
