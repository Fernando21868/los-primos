import './table.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICategories, IUsers } from '../../pagesAdmin/list/types';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalGeneric } from '../modalGeneric/ModalGeneric';
import { DeleteData } from '../deleteData/DeleteData';
import { deleteSingleCategory, deleteSingleUser } from '../deleteData/deleteDataService';
import { updateCategoriesAction } from '../../store/categoriesSlice';
import { updateUsersAction } from '../../store/usersSlice';

export interface Props {
  page: string;
  headings: { [key: string]: string };
}

export function Table({ page, headings }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  const dispatch = useDispatch();
  let users = useSelector((state: RootState) => state.users.users);
  let categories = useSelector((state: RootState) => state.categories.categories);

  /**
   * Open the modal
   */
  function openModal() {
    setIsOpen(true);
  }

  /**
   * Close the modal
   */
  function closeModal() {
    setIsOpen(false);
  }

  function handleDelete(e: React.MouseEvent<HTMLAnchorElement>) {
    setIdToDelete(e.currentTarget.id);
  }

  async function handleDeleteData() {
    setIsDeleting(true);
    if (page === 'Categorias') {
      await deleteSingleCategory(idToDelete);
      categories = categories?.filter((category) => category._id !== idToDelete);
      dispatch(updateCategoriesAction(categories));
    }
    if (page === 'Usuarios') {
      await deleteSingleUser(idToDelete);
      users = users?.filter((user) => user._id !== idToDelete);
      dispatch(updateUsersAction(users));
    }
    setIsDeleting(false);
  }

  console.log('categories', categories);
  console.log('users', users);

  return (
    <>
      <table className="list__table">
        <caption className="list__caption">Tabla de {page}</caption>
        <thead className="list__head">
          <tr className={`list__row ${lightDarkMode ? 'dark' : ''}`}>
            {Object.keys(headings).map((heading, index) => {
              return (
                <th
                  key={index}
                  className={`list__heading ${lightDarkMode ? 'dark' : ''}`}
                  scope="col"
                >
                  {headings[heading]}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="list__body">
          {categories?.length
            ? categories?.map((category, index) => (
                <tr className={`list__row ${lightDarkMode ? 'dark' : ''}`} key={index}>
                  {Object.keys(headings).map((heading: any, index: number) => {
                    return (
                      <td
                        key={index}
                        className={`list__data ${lightDarkMode ? 'dark' : ''}`}
                        data-label={headings[heading]}
                      >
                        {heading === 'actions' ? (
                          <div className="list__buttons">
                            <Link
                              to={`detail/${category['_id']}`}
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                            >
                              <FontAwesomeIcon icon={faEye} />
                              Ver
                            </Link>
                            <Link
                              to={category['_id']}
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                              Editar
                            </Link>
                            <Link
                              to="#"
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                              onClick={(e) => {
                                openModal();
                                handleDelete(e);
                              }}
                              id={category['_id']}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Eliminar
                            </Link>
                          </div>
                        ) : heading === 'photo' ? (
                          <img
                            className="list__img"
                            src={`${category[heading as keyof ICategories]}`}
                            alt="category"
                          />
                        ) : (
                          category[heading as keyof ICategories]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            : users?.map((user, index) => (
                <tr className={`list__row ${lightDarkMode ? 'dark' : ''}`} key={index}>
                  {Object.keys(headings).map((heading: any, index) => {
                    return (
                      <td
                        key={index}
                        className={`list__data ${lightDarkMode ? 'dark' : ''}`}
                        data-label={headings[heading]}
                      >
                        {heading === 'actions' ? (
                          <div className="list__buttons">
                            <Link
                              to={`detail/${user['_id']}`}
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                            >
                              <FontAwesomeIcon icon={faEye} />
                              Ver
                            </Link>
                            <Link
                              to={user['_id']}
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                              Editar
                            </Link>
                            <Link
                              to="#"
                              className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
                              onClick={(e) => {
                                openModal();
                                handleDelete(e);
                              }}
                              id={user['_id']}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Eliminar
                            </Link>
                          </div>
                        ) : heading === 'profilePhoto' ? (
                          <img
                            className="list__img"
                            src={`${user[heading as keyof IUsers]}`}
                            alt="profile"
                          />
                        ) : (
                          user[heading as keyof IUsers]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
        </tbody>
      </table>
      <ModalGeneric isOpen={isOpen} closeModal={closeModal}>
        <DeleteData handleDeleteData={handleDeleteData} isDeleting={isDeleting} dataType={page} />
      </ModalGeneric>
    </>
  );
}
