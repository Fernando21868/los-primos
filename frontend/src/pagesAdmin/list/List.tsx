import { useEffect, useState } from 'react';
import './list.css';
import { getCategories, getUsers } from './getProductsUsers';
import { ICategories, IUsers } from './types';

export function List() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [headings, setHeadings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('');

  const pathname = window.location.pathname.split('/').pop()!;

  useEffect(() => {
    let cancel = false;
    switch (pathname) {
      case 'categories':
        getCategories().then((data) => {
          if (!cancel) {
            setHeadings(['Nombre Categoria', 'Descripcion', 'Imagen', 'Creacion', 'Actualizacion']);
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
            setHeadings([
              'ID',
              'DNI',
              'Nombre',
              'Apellido',
              'Email',
              'Telefono',
              'Foto',
              'Sexo',
              'Creacion',
              'Actualizacion',
            ]);
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
        <table className="list__table">
          <caption className="list__caption">Tabla de {page}</caption>
          <thead className="list__head">
            <tr className="list__row">
              {headings.map((heading) => {
                return (
                  <th className="list__heading" scope="col">
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="list__body">
            {categories.length
              ? categories.map((category, index) => (
                  <tr className="list__row" key={index}>
                    <td className="list__data" data-label={headings[0]}>
                      {category?.nameCategory}
                    </td>
                    <td className="list__data" data-label={headings[1]}>
                      {category?.description}
                    </td>
                    <td className="list__data" data-label={headings[2]}>
                      <img src={category?.photo} alt="category" className="list__img" />
                    </td>
                    <td className="list__data" data-label={headings[8]}>
                      {category.createdAt}
                    </td>
                    <td className="list__data" data-label={headings[9]}>
                      {category.updatedAt}
                    </td>
                  </tr>
                ))
              : users.map((user) => (
                  <tr className="list__row" key={user._id}>
                    <td className="list__data" data-label={headings[0]}>
                      {user._id}
                    </td>
                    <td className="list__data" data-label={headings[1]}>
                      {user.dni}
                    </td>
                    <td className="list__data" data-label={headings[2]}>
                      {user.firstName}
                    </td>
                    <td className="list__data" data-label={headings[3]}>
                      {user.lastName}
                    </td>
                    <td className="list__data" data-label={headings[4]}>
                      {user.email}
                    </td>
                    <td className="list__data" data-label={headings[5]}>
                      {user.phoneNumber}
                    </td>
                    <td className="list__data" data-label={headings[6]}>
                      <img src={user.profilePhoto} alt="profile" className="list__img" />
                    </td>
                    <td className="list__data" data-label={headings[7]}>
                      {user.sex}
                    </td>
                    <td className="list__data" data-label={headings[8]}>
                      {user.createdAt}
                    </td>
                    <td className="list__data" data-label={headings[9]}>
                      {user.updatedAt}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
