import { useEffect, useState } from 'react';
import './list.css';
import { getProducts, getUsers } from './getProductsUsers';
import { TProducts, TUsers } from './types';

export function List() {
  const [usersProducts, setUsersProducts] = useState<TProducts[] | TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = window.location.pathname.split('/').pop()!;

  useEffect(() => {
    let cancel = false;
    switch (pathname) {
      case 'products':
        getProducts().then((data) => {
          if (!cancel) {
            setUsersProducts(data);
            setIsLoading(false);
          }
        });
        break;
      case 'users':
        getUsers().then((data) => {
          if (!cancel) {
            setUsersProducts(data);
            setIsLoading(false);
          }
        });
        break;
      default:
        break;
    }
  }, [pathname]);

  console.log(usersProducts);

  return (
    <div className="list">
      <div className="list__container">
        <table className="list__table">
          <caption className="list__caption">Tabla de {pathname}</caption>
          <thead className="list__head">
            <tr className="list__row">
              <th className="list__heading" scope="col">
                Account
              </th>
              <th className="list__heading" scope="col">
                Due Date
              </th>
              <th className="list__heading" scope="col">
                Amount
              </th>
              <th className="list__heading" scope="col">
                Period
              </th>
            </tr>
          </thead>
          <tbody className="list__body">
            <tr className="list__row">
              <td className="list__data" data-label="Account">
                Visa - 3412
              </td>
              <td className="list__data" data-label="Due Date">
                04/01/2016
              </td>
              <td className="list__data" data-label="Amount">
                $1,190
              </td>
              <td className="list__data" data-label="Period">
                03/01/2016 - 03/31/2016
              </td>
            </tr>
            <tr className="list__row">
              <td className="list__data" scope="row" data-label="Account">
                Visa - 6076
              </td>
              <td className="list__data" data-label="Due Date">
                03/01/2016
              </td>
              <td className="list__data" data-label="Amount">
                $2,443
              </td>
              <td className="list__data" data-label="Period">
                02/01/2016 - 02/29/2016
              </td>
            </tr>
            <tr className="list__row">
              <td className="list__data" scope="row" data-label="Account">
                Corporate AMEX
              </td>
              <td className="list__data" data-label="Due Date">
                03/01/2016
              </td>
              <td className="list__data" data-label="Amount">
                $1,181
              </td>
              <td className="list__data" data-label="Period">
                02/01/2016 - 02/29/2016
              </td>
            </tr>
            <tr className="list__row">
              <td className="list__data" scope="row" data-label="Acount">
                Visa - 3412
              </td>
              <td className="list__data" data-label="Due Date">
                02/01/2016
              </td>
              <td className="list__data" data-label="Amount">
                $842
              </td>
              <td className="list__data" data-label="Period">
                01/01/2016 - 01/31/2016
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
