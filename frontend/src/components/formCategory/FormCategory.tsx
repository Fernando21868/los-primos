import './formCategory.css';
import { TCategoryForm } from '../../interfaces/types';
import { useForm, FieldError } from 'react-hook-form';
import { updateCategory } from '../../services/updateData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Loading } from '../loading/Loading';
import { Modal } from '../modal/Modal';
import { updateCategoryAction } from '../../store/categorySlice';

export function FormCategory() {
  // Initializations for Form, and watch password repeat
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategoryForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const dispatch = useDispatch();

  // Initializations for modal actions
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initializations for user or category
  const category = useSelector((state: RootState) => state.category.category);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);
  console.log(category);

  // Initializations for user or category FormsData
  const [categoryDataForm, setCategoryDataForm] = useState<TCategoryForm>({
    nameCategory: category?.nameCategory!,
    description: category?.description!,
  });

  /**
   * It will update the state of the data that the user enter in the Forms of user or category
   * @date 7/5/2023 - 10:34:02 PM
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setCategoryDataForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * It will update only the data, not the images of user and category
   * @date 7/14/2023 - 9:47:38 PM
   *
   * @async
   * @param {TCategoryForm} data
   * @returns {*}
   */
  async function onSubmit(data: TCategoryForm) {
    setIsUpdating(true);
    const newCategory = await updateCategory(data as TCategoryForm, category!['_id']);
    dispatch(updateCategoryAction(newCategory));
    setIsUpdating(false);
  }

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

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'error' : '';
  }

  return (
    <div className="form">
      <h1 className="form__title">Actualizar Categoria</h1>
      {isUpdating ? <Loading content="Actualizando datos" isLoading={isUpdating}></Loading> : null}
      <div className="form__image">
        <img
          className={`form__img ${lightDarkMode ? 'dark' : ''}`}
          referrerPolicy="no-referrer"
          src={category?.photo}
          alt="profile"
        />
        <button onClick={openModal} className={`form__button-img ${lightDarkMode ? 'dark' : ''}`}>
          <FontAwesomeIcon className="form__icon" icon={faCamera} />
        </button>
      </div>
      <form className="form__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.nameCategory)}`}
            htmlFor="nameCategory"
          >
            Nombre Categoria
          </label>
          <select
            value={categoryDataForm['nameCategory']}
            className={`form__input ${getEditorStyle(errors.nameCategory)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            {...register('nameCategory', {
              required: 'Debes ingresar el Nombre de la Categoria',
            })}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Selecciona una Categoria
            </option>
            <option value="conveniencia">Conveniencia</option>
            <option value="golosinas">Golosinas</option>
            <option value="bebidas">Bebidas</option>
            <option value="limpieza">Limpieza</option>
            <option value="refrigerados">Refrigerados</option>
            <option value="no perecederos">No perecederos</option>
          </select>
          <div className="form__errors">{errors.nameCategory?.message}</div>
        </div>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.description)}`}
            htmlFor="description"
          >
            Descripcion
          </label>
          <textarea
            value={categoryDataForm.description}
            className={`form__input ${getEditorStyle(errors.description)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            {...register('description', {
              required: 'Debes ingresar una descripcion',
            })}
            onChange={handleChange}
          ></textarea>
          <div className="form__errors">{errors.description?.message}</div>
        </div>
        <div className="form__submit">
          <button type="submit" className={`form__button ${lightDarkMode ? 'dark' : ''}`}>
            Actualizar
          </button>
        </div>
      </form>
      <Modal isOpen={isOpen} closeModal={closeModal}></Modal>
    </div>
  );
}
