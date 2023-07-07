import './modal.css';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TCategoryForm, TImageFile } from '../../pagesAdmin/list/types';
import { updateCategoryPhoto, updateUserProfilePhoto } from '../form/updateData';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUserAction } from '../../store/userSlice';
import { updateCategoryAction } from '../../store/categorySlice';
import { Loading } from '../loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * Interface for props of Modal component
 * @date 7/1/2023 - 11:30:17 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface Props {
  inputs: { [key: string]: string };
  isOpen: boolean;
  closeModal: () => void;
}

/**
 * Modal component receiving 3 parameters
 * @date 7/1/2023 - 11:29:53 PM
 *
 * @export
 * @param {Props} { inputs, isOpen, closeModal }
 * @returns {*}
 */
export function Modal({ inputs, isOpen, closeModal }: Props) {
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<TImageFile>();

  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.category);
  const user = useSelector((state: RootState) => state.user.user);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  /**
   * Function to click outside the Modal component and closed it
   * @date 7/1/2023 - 11:29:00 PM
   *
   * @param {*} e
   */
  function handleOverlayClick(e: any) {
    if (e.target === modalRef.current) {
      closeModal();
    }
  }

  /**
   * Function to handle, save the selected file to preview it
   * @date 7/1/2023 - 11:29:13 PM
   *
   * @param {*} e
   */
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  /**
   * Function to preview the file in the Modal component
   * @date 7/1/2023 - 11:29:25 PM
   *
   * @param {File} file
   */
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  /**
   * Function to update the category or the user by using Redux
   * @date 7/1/2023 - 11:29:31 PM
   *
   * @async
   * @param {*} data
   * @returns {*}
   */
  async function handleSubmitFile(data: any) {
    setIsUpdating(true);
    if (data && category) {
      const categoryUpdated = await updateCategoryPhoto(
        data['file'][0],
        category!['_id' as keyof TCategoryForm],
      );
      dispatch(updateCategoryAction(categoryUpdated));
    }
    if (data && user) {
      const userUpdated = await updateUserProfilePhoto(data['file'][0], user['_id']);
      dispatch(updateUserAction(userUpdated));
    }
    setIsUpdating(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className={`form__modal ${isOpen ? 'open' : 'close'}`}
    >
      {isUpdating ? <Loading content="Actualizando imagen" isLoading={isUpdating}></Loading> : null}
      <div className={`form__modal-container ${lightDarkMode ? 'dark' : ''}`}>
        <div className="form__modal-content">
          <button
            className={`form__modal-close ${lightDarkMode ? 'dark' : ''}`}
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="form__modal-file">
            <form
              className="form__modal-form"
              noValidate
              onSubmit={handleSubmit2(handleSubmitFile)}
              encType="multipart/form-data"
            >
              {selectedFile ? (
                <div className="form__modal-image">
                  <img
                    className={`form__img ${lightDarkMode ? 'dark' : ''}`}
                    src={previewSource}
                    alt="Preview of upload"
                  />
                </div>
              ) : null}
              <input
                className={`form__modal-input ${lightDarkMode ? 'dark' : ''}`}
                type="file"
                {...register2('file', {
                  required: `Debes ingresar el campo ${
                    user ? inputs['profilePhoto'] : inputs['photo']
                  }`,
                })}
                onChange={handleFileChange}
              />
              <div className="form__errors">
                {errors2['file'] ? errors2['file']?.message : null}
              </div>
              <button className={lightDarkMode ? 'dark' : ''} type="submit">
                Cambiar Imagen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
