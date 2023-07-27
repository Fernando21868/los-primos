import './viewSingleProduct.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getDate, getFormatPrice } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesStacked,
  faCalendarDays,
  faClock,
  faDollarSign,
  faFileLines,
  faPenToSquare,
  faRectangleList,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function ViewSingleProduct() {
  // Initializations for labels
  const product = useSelector((state: RootState) => state.product.product);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
    <div className={`viewSingleCategory ${lightDarkMode ? 'dark' : ''}`}>
      <div className="viewSingleCategory__picture">
        <div className="viewSingleCategory__images">
          <img
            className={`viewSingleCategory__image ${lightDarkMode ? 'dark' : ''}`}
            src={product?.photo}
            alt="product"
          />
        </div>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">Producto: </span>
          <span className="viewSingleCategory__span">{product?.name}</span>
        </p>
      </div>
      <div className="viewSingleCategory__info">
        <div className="viewSingleCategory__dates">
          <p className="viewSingleCategory__name">
            <span className="viewSingleCategory__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              Creado:{' '}
            </span>
            <span className="viewSingleCategory__span">{getDate(product?.createdAt!)}</span>
          </p>
          <p className="viewSingleCategory__name">
            <span className="viewSingleCategory__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              Actualizado:{' '}
            </span>
            <span className="viewSingleCategory__span">{getDate(product?.updatedAt!)}</span>
          </p>
        </div>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faTags} />
            Marca:
          </span>
          <span className="viewSingleCategory__span">{product?.brand}</span>
        </p>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faRectangleList} />
            Categoria:
          </span>
          <span className="viewSingleCategory__span">{product?.category.nameCategory}</span>
        </p>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faClock} />
            Vencimiento:
          </span>
          <span className="viewSingleCategory__span">{product?.expirationDate}</span>
        </p>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faDollarSign} />
            Precio:
          </span>
          <span className="viewSingleCategory__span">{getFormatPrice(product?.price!)}</span>
        </p>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faBoxesStacked} />
            Stock:
          </span>
          <span className="viewSingleCategory__span">{product?.stock}</span>
        </p>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faFileLines} />
            Descripcion:
          </span>
          <span className="viewSingleCategory__span">{product?.description}</span>
        </p>
        <Link
          to={`../${product?._id as string}`}
          className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Editar
        </Link>
      </div>
    </div>
  );
}
