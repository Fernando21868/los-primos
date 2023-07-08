import './deleteData.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleCategory, deleteSingleUser } from './deleteDataService';
import { Loading } from '../loading/Loading';

type Props = {
  dataType: string;
  handleDeleteData: () => void;
  isDeleting: boolean;
};

export function DeleteData({ handleDeleteData, isDeleting, dataType }: Props) {
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
    <div className="deleteData">
      {isDeleting ? (
        <Loading
          content={`Eliminando el/la ${dataType === 'Usuarios' ? 'usuario' : 'categoria'}`}
          isLoading={isDeleting}
        ></Loading>
      ) : null}
      <h2 className="deleteData__title">
        ¿Estas seguro que deseas eliminar el/la {dataType === 'Usuarios' ? 'usuario' : 'categoria'}
      </h2>
      <button onClick={handleDeleteData} className={lightDarkMode ? 'dark' : ''}>
        <FontAwesomeIcon icon={faTrash} /> Eliminar
      </button>
    </div>
  );
}
