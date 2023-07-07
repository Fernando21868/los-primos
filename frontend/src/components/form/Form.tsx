import './form.css';
import { TCategoryForm, TUserForm } from '../../pagesAdmin/list/types';
import { useForm, FieldErrors } from 'react-hook-form';
import { updateCategory, updateUser } from './updateData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../modal/Modal';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { State, updateUserAction } from '../../store/userSlice';
import { updateCategoryAction } from '../../store/categorySlice';
import { Loading } from '../loading/Loading';

interface Props {
  formLabel: string;
}

/**
 * Component to render dinamically a Form for the user or category
 * @date 7/5/2023 - 10:37:48 PM
 *
 * @export
 * @param {Props} { formLabel }
 * @returns {*}
 */
export function Form({ formLabel }: Props) {
  // Initializations for Form, and watch password repeat
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TUserForm | TCategoryForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const password = watch('password');
  const dispatch = useDispatch();

  // Initializations for modal actions
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initializations for labels of inputs
  const userHeadings = useSelector((state: RootState) => state.user.headings);
  const categoryHeadings = useSelector((state: RootState) => state.category.headings);
  const inputs = userHeadings ? userHeadings! : categoryHeadings!;

  // Initializations for user or category
  const category = useSelector((state: RootState) => state.category.category);
  const isLoadingCategory = useSelector((state: RootState) => state.category.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoadingUser = useSelector((state: RootState) => state.user.loading);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  // Initializations for user or category FormsData
  const [userDataForm, setUserDataForm] = useState<TUserForm>({
    dni: user?.dni!,
    firstName: user?.firstName!,
    lastName: user?.lastName!,
    password: user?.password!,
    repeatPassword: user?.repeatPassword!,
    email: user?.email!,
    phoneNumber: user?.phoneNumber!,
    sex: user?.sex!,
  });
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
    if (user) {
      setUserDataForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    if (category) {
      setCategoryDataForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  /**
   * It will update only the data, not the images of user and category
   * @date 7/5/2023 - 10:35:47 PM
   *
   * @async
   * @param {(TUserForm | TCategoryForm)} data
   * @returns {*}
   */
  async function onSubmit(data: TUserForm | TCategoryForm) {
    setIsUpdating(true);
    if (formLabel === 'Usuarios') {
      const newUser = await updateUser(data as TUserForm, user!['_id']);
      dispatch(updateUserAction(newUser));
    }
    if (formLabel === 'Categorias') {
      const newCategory = await updateCategory(data as TCategoryForm, category!['_id']);
      dispatch(updateCategoryAction(newCategory));
    }
    setIsUpdating(false);
    // navigate('..');
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

  /**
   * Styles when user enter incorrect data on inputs
   * @date 7/5/2023 - 10:37:21 PM
   *
   * @param {FieldErrors<TCategoryForm | TUserForm>} fieldError
   * @param {keyof FieldErrors<TCategoryForm | TUserForm>} key
   * @returns {("border-red" | "")}
   */
  function getEditorStyle(
    fieldError: FieldErrors<TCategoryForm | TUserForm>,
    key: keyof FieldErrors<TCategoryForm | TUserForm>,
  ) {
    return fieldError[key] ? 'error' : '';
  }

  if ((category && isLoadingCategory) || (user && isLoadingUser)) {
    return <div>...Loading</div>;
  }

  return (
    <div className="form">
      <h1 className="form__title">{formLabel}</h1>
      {isUpdating ? <Loading content="Actualizando datos" isLoading={isUpdating}></Loading> : null}
      <div className="form__image">
        {Object.keys(inputs).map((key: any, index) => {
          if (key === 'profilePhoto' || key === 'photo') {
            return (
              <img
                className={`form__img ${lightDarkMode ? 'dark' : ''}`}
                key={index}
                referrerPolicy="no-referrer"
                src={`${
                  user
                    ? user![key as keyof TUserForm]
                    : category
                    ? category![key as keyof TCategoryForm]
                    : 'null'
                }`}
                alt={formLabel}
              />
            );
          }
        })}
        <button onClick={openModal} className={`form__button-img ${lightDarkMode ? 'dark' : ''}`}>
          <FontAwesomeIcon className="form__icon" icon={faCamera} />
        </button>
      </div>
      <form
        className={`form__form ${formLabel !== 'Categorias' ? 'grid' : ''}`}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {Object.keys(inputs).map((key: any, index: number) => {
          if (key !== 'profilePhoto' && key !== 'photo') {
            return (
              <div className="form__field" key={index}>
                <label className={`form__label ${getEditorStyle(errors, key)}`} htmlFor={key}>
                  {inputs[key as keyof State['headings']]}
                </label>
                {key !== 'description' && key !== 'sex' && key !== 'nameCategory' ? (
                  <input
                    value={
                      user
                        ? userDataForm[key as keyof TUserForm]
                        : category
                        ? categoryDataForm[key as keyof TCategoryForm]
                        : 'null'
                    }
                    className={`form__input ${getEditorStyle(errors, key)} ${
                      lightDarkMode ? 'dark' : ''
                    }`}
                    type={
                      key === 'password' || key === 'repeatPassword'
                        ? 'password'
                        : key === 'email'
                        ? 'email'
                        : 'text'
                    }
                    {...register(key, {
                      required: `Debes ingresar el campo ${inputs[key as keyof State['headings']]}`,
                      pattern:
                        key === 'password' || key === 'repeatPassword'
                          ? {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                              message: 'Contraseña no cumple con los requisitos',
                            }
                          : key === 'email'
                          ? {
                              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: 'Email invalido',
                            }
                          : undefined,
                      validate:
                        key === 'repeatPassword'
                          ? (value) => value === password || 'Las contraseñas no coinciden'
                          : undefined,
                    })}
                    onChange={handleChange}
                  />
                ) : key === 'description' ? (
                  <textarea
                    value={categoryDataForm[key as keyof TCategoryForm]}
                    className={`form__input ${getEditorStyle(errors, key)} ${
                      lightDarkMode ? 'dark' : ''
                    }`}
                    {...register(key, {
                      required: `Debes ingresar el campo ${inputs[key as keyof State['headings']]}`,
                    })}
                    onChange={handleChange}
                  ></textarea>
                ) : key === 'nameCategory' ? (
                  <select
                    value={categoryDataForm['nameCategory']}
                    className={`form__input ${getEditorStyle(errors, key)} ${
                      lightDarkMode ? 'dark' : ''
                    }`}
                    {...register(key, {
                      required: 'Debes ingresar el campo Nombre Categoria',
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
                ) : (
                  <select
                    value={userDataForm['sex']}
                    className={`form__input ${getEditorStyle(errors, key)} ${
                      lightDarkMode ? 'dark' : ''
                    }`}
                    {...register(key, {
                      required: 'Debes ingresar el campo Sexo',
                    })}
                    onChange={handleChange}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="sin especificar">Sin especificar</option>
                  </select>
                )}
                <div className="form__errors">
                  {errors[key as keyof FieldErrors<TUserForm | TCategoryForm>]
                    ? errors[key as keyof FieldErrors<TUserForm | TCategoryForm>]?.message
                    : null}
                </div>
              </div>
            );
          }
          return null;
        })}
        <div className="form__submit">
          <button type="submit" className={`form__button ${lightDarkMode ? 'dark' : ''}`}>
            Actualizar
          </button>
        </div>
      </form>
      <Modal closeModal={closeModal} inputs={inputs} isOpen={isOpen}></Modal>
    </div>
  );
}
