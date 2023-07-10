import './viewSingleCategory.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getDate } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faFileLines,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function ViewSingleCategory() {
  // Initializations for labels
  const categoryHeadings = useSelector((state: RootState) => state.category.headings);
  const category = useSelector((state: RootState) => state.category.category);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
    <div className={`viewSingleCategory ${lightDarkMode ? 'dark' : ''}`}>
      <div className="viewSingleCategory__picture">
        <div className="viewSingleCategory__images">
          <img
            className={`viewSingleCategory__image ${lightDarkMode ? 'dark' : ''}`}
            src={category?.photo}
            alt={categoryHeadings?.photo}
          />
        </div>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">{categoryHeadings?.nameCategory}: </span>
          <span className="viewSingleCategory__span">{category?.nameCategory}</span>
        </p>
      </div>
      <div className="viewSingleCategory__info">
        <div className="viewSingleCategory__dates">
          <p className="viewSingleCategory__name">
            <span className="viewSingleCategory__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              {categoryHeadings?.createdAt}:{' '}
            </span>
            <span className="viewSingleCategory__span">{getDate(category?.createdAt!)}</span>
          </p>
          <p className="viewSingleCategory__name">
            <span className="viewSingleCategory__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              {categoryHeadings?.updatedAt}:{' '}
            </span>
            <span className="viewSingleCategory__span">{getDate(category?.updatedAt!)}</span>
          </p>
        </div>
        <p className="viewSingleCategory__name">
          <span className="viewSingleCategory__desc">
            <FontAwesomeIcon icon={faFileLines} />
            {categoryHeadings?.description}:
          </span>
          <span className="viewSingleCategory__span">{category?.description}</span>
        </p>
        <Link
          to={`../${category?._id as string}`}
          className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Editar
        </Link>
      </div>
    </div>
  );
}
