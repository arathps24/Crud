import React, { useState } from 'react'
import Imagen from "../assets/pantalla.jpg"
import { useNavigate } from 'react-router-dom';
import { loginadmin } from '../api/api';
import { useUser } from './UserContext';
export default function Login({ onLogin }) {
    const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginadmin(nombre, password);
      onLogin();
      navigate('/Inicio');
      updateUser(nombre);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };
  
 

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={Imagen} alt=''/>
        </div>
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
                <h2 className='text-4xl dark:text-white font-bold  text-center'>
                    Login 
                </h2>
                <div className='flex flex-col text-gray-400  py-2'>
                    <label>Nombre</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2
                     focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                     type="text" 
                     value={nombre} // Asigna el valor del estado al campo de entrada
                     onChange={handleNombreChange}
                     />
                </div>
                <div className='flex flex-col text-gray-400  py-2'>
                    <label>Contraseña</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                    type="password" 
                    value={password} // Asigna el valor del estado al campo de entrada
                    onChange={handlePasswordChange}
                    />
                  
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox"/> Recordar Contraseña</p>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 
                shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
                type='submit'>Entrar</button>
            </form>
        </div>
        </div>
  )
}
