import { useSelector } from 'react-redux';
import { ICategories, IUsers } from '../../pagesAdmin/list/types';
import { RootState } from '../../store/store';
import { Button } from '../button/Button';
import './table.css';

export interface Props {
  page: string;
  headings: { [key: string]: string };
  users: IUsers[];
  categories: ICategories[];
}

export function Table({ page, headings, categories, users }: Props) {
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
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
        {categories.length
          ? categories.map((category, index) => (
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
                          <Button
                            styleButton={'list__button view'}
                            id={`detail/${category['_id']}`}
                            actions={'Ver'}
                          ></Button>
                          <Button
                            styleButton={'list__button edit'}
                            id={category['_id']}
                            actions={'Editar'}
                          ></Button>
                          <Button
                            styleButton={'list__button delete'}
                            id={category['_id']}
                            actions={'Eliminar'}
                          ></Button>
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
          : users.map((user, index) => (
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
                          <Button
                            styleButton={'list__button view'}
                            id={`detail/${user['_id']}`}
                            actions={'Ver'}
                          ></Button>
                          <Button
                            styleButton={'list__button edit'}
                            id={user['_id']}
                            actions={'Editar'}
                          ></Button>
                          <Button
                            styleButton={'list__button delete'}
                            id={user['_id']}
                            actions={'Eliminar'}
                          ></Button>
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
  );
}
