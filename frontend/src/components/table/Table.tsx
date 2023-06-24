import { ICategories, IUsers } from '../../pagesAdmin/list/types';
import { Button } from '../button/Button';
import './table.css';

export interface Props {
  page: string;
  headings: { [key: string]: string };
  users: IUsers[];
  categories: ICategories[];
}

export function Table({ page, headings, categories, users }: Props) {
  return (
    <table className="list__table">
      <caption className="list__caption">Tabla de {page}</caption>
      <thead className="list__head">
        <tr className="list__row">
          {Object.keys(headings).map((heading) => {
            return (
              <th className="list__heading" scope="col">
                {headings[heading]}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="list__body">
        {categories.length
          ? categories.map((category, index) => (
              <tr className="list__row" key={index}>
                {Object.keys(headings).map((heading: any) => {
                  return (
                    <td className="list__data" data-label={headings[heading]}>
                      {heading !== 'actions' ? (
                        category[heading as keyof ICategories]
                      ) : (
                        <div className="list__buttons">
                          <Button styleButton={'list__button view'} actions={'ver'}></Button>
                          <Button styleButton={'list__button edit'} actions={'editar'}></Button>
                          <Button styleButton={'list__button delete'} actions={'eliminar'}></Button>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          : users.map((user) => (
              <tr className="list__row" key={user._id}>
                {Object.keys(headings).map((heading: any) => {
                  return (
                    <td className="list__data" data-label={headings[heading]}>
                      {heading !== 'actions' ? (
                        user[heading as keyof IUsers]
                      ) : (
                        <div className="list__buttons">
                          <Button styleButton={'list__button view'} actions={'ver'}></Button>
                          <Button styleButton={'list__button edit'} actions={'editar'}></Button>
                          <Button styleButton={'list__button delete'} actions={'eliminar'}></Button>
                        </div>
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
