import './formProduct.css';
import { TProductForm } from '../../interfaces/types';
import { useForm, FieldError } from 'react-hook-form';
import { updateProduct } from '../../services/updateData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Loading } from '../loading/Loading';
import { Modal } from '../modal/Modal';
import { updateProductAction } from '../../store/productSlice';

export function FormProduct() {
  // Initializations for Form, and watch password repeat
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProductForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const dispatch = useDispatch();

  // Initializations for modal actions
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initializations for user or category
  const product = useSelector((state: RootState) => state.product.product);
  const categories = useSelector((state: RootState) => state.category.categories);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);
  console.log(product);

  // Initializations for user or category FormsData
  const [productDataForm, setProductDataForm] = useState<TProductForm>({
    name: product?.name ?? '',
    category: product?.category ?? { nameCategory: '' },
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    brand: product?.brand ?? '',
    expirationDate: product?.expirationDate ?? '',
    description: product?.description ?? '',
    barcode: product?.barcode ?? '',
    weight: product?.weight ?? '',
    size: product?.size ?? '',
  });

  /**
   * It will update the state of the data that the user enter in the Forms of user or category
   * @date 7/14/2023 - 10:13:44 PM
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setProductDataForm((prevState) => ({
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
  async function onSubmit(data: TProductForm) {
    setIsUpdating(true);
    const newProduct = await updateProduct(data as TProductForm, product!['_id']);
    dispatch(updateProductAction(newProduct));
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
          src={product?.photo}
          alt="profile"
        />
        <button onClick={openModal} className={`form__button-img ${lightDarkMode ? 'dark' : ''}`}>
          <FontAwesomeIcon className="form__icon" icon={faCamera} />
        </button>
      </div>
      <form className="form__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.name)}`} htmlFor="name">
            Nombre
          </label>
          <input
            value={productDataForm?.name}
            className={`form__input ${getEditorStyle(errors.name)} ${lightDarkMode ? 'dark' : ''}`}
            type="text"
            {...register('name', {
              required: 'Debes ingresar el campo el nombre',
              minLength: 2,
              maxLength: 50,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.name?.message}</div>
        </div>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.description)}`}
            htmlFor="description"
          >
            Descripcion
          </label>
          <textarea
            value={productDataForm.description}
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
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.category?.nameCategory)}`}
            htmlFor="nameCategory"
          >
            Categoria
          </label>
          <select
            value={productDataForm.category.nameCategory}
            className={`form__input ${getEditorStyle(errors.category?.nameCategory)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            {...register('category', {
              required: 'Debes ingresar el Nombre de la Categoria',
            })}
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Selecciona una Categoria
            </option>
            {categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.nameCategory}
              </option>
            ))}
          </select>
          <div className="form__errors">{errors.category?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.brand)}`} htmlFor="brand">
            Marca
          </label>
          <input
            value={productDataForm?.brand}
            className={`form__input ${getEditorStyle(errors.brand)} ${lightDarkMode ? 'dark' : ''}`}
            type="text"
            {...register('brand', {
              required: 'Debes ingresar una marca',
              minLength: 2,
              maxLength: 50,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.brand?.message}</div>
        </div>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.expirationDate)}`}
            htmlFor="expirationDate"
          >
            Fecha de Vencimiento
          </label>
          <input
            value={productDataForm?.expirationDate}
            className={`form__input ${getEditorStyle(errors.expirationDate)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="text"
            {...register('expirationDate', {
              required: 'Debes ingresar la fecha de vencimiento',
              minLength: 2,
              maxLength: 50,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.expirationDate?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.price)}`} htmlFor="price">
            Precio
          </label>
          <input
            value={productDataForm?.price}
            className={`form__input ${getEditorStyle(errors.price)} ${lightDarkMode ? 'dark' : ''}`}
            type="number"
            {...register('price', {
              required: 'Debes ingresar el campo un precio',
              max: 5_001,
              min: 4,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.price?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.stock)}`} htmlFor="stock">
            Stock
          </label>
          <input
            value={productDataForm?.stock}
            className={`form__input ${getEditorStyle(errors.stock)} ${lightDarkMode ? 'dark' : ''}`}
            type="number"
            {...register('stock', {
              required: 'Debes ingresar el stock',
              max: 5_001,
              min: 0,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.stock?.message}</div>
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
