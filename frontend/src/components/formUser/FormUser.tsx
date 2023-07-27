import './formUser.css';
import { TUserForm } from '../../interfaces/types';
import { useForm, FieldError } from 'react-hook-form';
import { updateUser } from '../../services/updateData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUserAction } from '../../store/userSlice';
import { Loading } from '../loading/Loading';
import { Modal } from '../modal/Modal';

export function FormUser() {
  // Initializations for Form, and watch password repeat
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TUserForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const password = watch('password');
  const dispatch = useDispatch();

  // Initializations for modal actions
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initializations for user or category
  const user = useSelector((state: RootState) => state.user.user);
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

  /**
   * It will update the state of the data that the user enter in the Forms of user or category
   * @date 7/5/2023 - 10:34:02 PM
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setUserDataForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * It will update only the data, not the images of user and category
   * @date 7/5/2023 - 10:35:47 PM
   *
   * @async
   * @param {(TUserForm | TCategoryForm)} data
   * @returns {*}
   */
  async function onSubmit(data: TUserForm) {
    setIsUpdating(true);
    const newUser = await updateUser(data as TUserForm, user!['_id']);
    dispatch(updateUserAction(newUser));
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
      <h1 className="form__title">Actualizar Usuario</h1>
      {isUpdating ? <Loading content="Actualizando datos" isLoading={isUpdating}></Loading> : null}
      <div className="form__image">
        <img
          className={`form__img ${lightDarkMode ? 'dark' : ''}`}
          referrerPolicy="no-referrer"
          src={user?.profilePhoto}
          alt="profile"
        />
        <button onClick={openModal} className={`form__button-img ${lightDarkMode ? 'dark' : ''}`}>
          <FontAwesomeIcon className="form__icon" icon={faCamera} />
        </button>
      </div>
      <form className="form__form grid" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.dni)}`} htmlFor="dni">
            DNI
          </label>
          <input
            value={userDataForm?.dni}
            className={`form__input ${getEditorStyle(errors.dni)} ${lightDarkMode ? 'dark' : ''}`}
            type="number"
            {...register('dni', {
              required: 'Debes ingresar el campo dni',
              max: 100_000_000,
              min: 1_000_000,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.dni?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.firstName)}`} htmlFor="firstName">
            Nombre
          </label>
          <input
            value={userDataForm?.firstName}
            className={`form__input ${getEditorStyle(errors.firstName)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="text"
            {...register('firstName', {
              required: 'Debes ingresar el campo tu nombre',
              minLength: 2,
              maxLength: 50,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.firstName?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.lastName)}`} htmlFor="lastName">
            Apellido
          </label>
          <input
            value={userDataForm?.lastName}
            className={`form__input ${getEditorStyle(errors.lastName)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="text"
            {...register('lastName', {
              required: 'Debes ingresar el campo tu apellido',
              minLength: 2,
              maxLength: 50,
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.lastName?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.password)}`} htmlFor="password">
            Contraseña
          </label>
          <input
            value={userDataForm?.password}
            className={`form__input ${getEditorStyle(errors.password)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="password"
            {...register('password', {
              required: 'Debes ingresar una contraseña',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: 'La contraseña no cumple con los requisitos',
              },
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.password?.message}</div>
        </div>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.repeatPassword)}`}
            htmlFor="repeatPassword"
          >
            Repetir Contraseña
          </label>
          <input
            value={userDataForm?.repeatPassword}
            className={`form__input ${getEditorStyle(errors.repeatPassword)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="password"
            {...register('repeatPassword', {
              required: 'Debes ingresar una contraseña',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message: 'La contraseña no cumple con los requisitos',
              },
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.repeatPassword?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.email)}`} htmlFor="email">
            E-mail
          </label>
          <input
            value={userDataForm?.email}
            className={`form__input ${getEditorStyle(errors.email)} ${lightDarkMode ? 'dark' : ''}`}
            type="email"
            {...register('email', {
              required: 'Debes ingresar un e-mail',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'E-mail invalido',
              },
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.email?.message}</div>
        </div>
        <div className="form__field">
          <label
            className={`form__label ${getEditorStyle(errors.phoneNumber)}`}
            htmlFor="phoneNumber"
          >
            Telefono
          </label>
          <input
            value={userDataForm?.phoneNumber}
            className={`form__input ${getEditorStyle(errors.phoneNumber)} ${
              lightDarkMode ? 'dark' : ''
            }`}
            type="text"
            {...register('phoneNumber', {
              required: 'Debes ingresar un telefono',
              pattern: {
                value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
                message: 'Telefono invalido',
              },
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.phoneNumber?.message}</div>
        </div>
        <div className="form__field">
          <label className={`form__label ${getEditorStyle(errors.sex)}`} htmlFor="sex">
            Sexo
          </label>
          <input
            value={userDataForm?.sex}
            className={`form__input ${getEditorStyle(errors.sex)} ${lightDarkMode ? 'dark' : ''}`}
            type="text"
            {...register('sex', {
              required: 'Debes ingresar un sexo',
            })}
            onChange={handleChange}
          />
          <div className="form__errors">{errors.sex?.message}</div>
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
