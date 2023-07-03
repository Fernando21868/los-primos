import { TCategoryForm, TUserForm } from '../../pagesAdmin/list/types';
import './form.css';
import { useForm, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateCategory, updateUser } from './updateData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../modal/Modal';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUserAction } from '../../store/userSlice';
import { updateCategoryAction } from '../../store/categorySlice';

interface Props {
  inputs: { [key: string]: string };
  formLabel: string;
}

export function Form({ formLabel, inputs }: Props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserForm | TCategoryForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const dispatch = useDispatch();

  const category = useSelector((state: RootState) => state.category.category);
  const isLoadingCategory = useSelector((state: RootState) => state.category.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoadingUser = useSelector((state: RootState) => state.user.loading);

  const [isOpen, setIsOpen] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  async function onSubmit(data: TUserForm | TCategoryForm) {
    if (formLabel === 'Usuarios') {
      const newUser = await updateUser(data as TUserForm, user!['_id']);
      dispatch(updateUserAction(newUser));
    }
    if (formLabel === 'Categorias') {
      const newCategory = await updateCategory(data as TCategoryForm, category!['_id']);
      dispatch(updateCategoryAction(newCategory));
    }
    navigate('..');
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getEditorStyle(
    fieldError: FieldErrors<TCategoryForm | TUserForm>,
    key: keyof FieldErrors<TCategoryForm | TUserForm>,
  ) {
    return fieldError[key] ? 'border-red' : '';
  }

  if ((category && isLoadingCategory) || (user && isLoadingUser)) {
    return <div>...Loading</div>;
  }

  return (
    <div className="form">
      <h1 className="form__title">{formLabel}</h1>
      <div className="form__image">
        {Object.keys(inputs).map((key: any, index) => {
          if (key === 'profilePhoto' || key === 'photo') {
            return (
              <img
                className="form__img"
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
        <button onClick={openModal} className="form__button-img">
          <FontAwesomeIcon className="form__icon" icon={faCamera} />
        </button>
      </div>
      <form className="form__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(inputs).map((key: any, index: number) => {
          if (key !== 'profilePhoto' && key !== 'photo') {
            return (
              <div className="form__field" key={index}>
                <label className="form__label" htmlFor={key}>
                  {inputs[key]}
                </label>
                {key !== 'description' ? (
                  <input
                    value={
                      user
                        ? userDataForm[key as keyof TUserForm]
                        : category
                        ? categoryDataForm[key as keyof TCategoryForm]
                        : 'null'
                    }
                    className={`form__input ${getEditorStyle(errors, key)}`}
                    type="text"
                    {...register(key, {
                      required: `Debes ingresar el campo ${inputs[key]}`,
                    })}
                    onChange={handleChange}
                  />
                ) : (
                  <textarea
                    value={categoryDataForm[key as keyof TCategoryForm]}
                    className={`form__input ${getEditorStyle(errors, key)}`}
                    {...register(key, {
                      required: `Debes ingresar el campo ${inputs[key]}`,
                    })}
                    onChange={handleChange}
                  ></textarea>
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
          <button type="submit" className="form__button">
            Actualizar
          </button>
        </div>
      </form>
      <Modal closeModal={closeModal} inputs={inputs} isOpen={isOpen}></Modal>
    </div>
  );
}
