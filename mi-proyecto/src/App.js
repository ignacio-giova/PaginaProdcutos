import './App.css';
import React, { useState } from 'react';

function App() {
  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    cuil: '',
    email: '',
    usuario: '',
    contraseña: ''
  });
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error;
    switch (field) {
      case 'nombre':
      case 'apellido':
      case 'usuario':
        error = value.trim().length >= 2 ? '' : 'Mínimo 2 caracteres';
        break;
      case 'cuil':
        error = /^\d+$/.test(value) ? '' : 'Solo números';
        break;
      case 'email':
        error = /.+@.+\..+/.test(value) ? '' : 'Debe contener @ y dominio';
        break;
      case 'contraseña':
        error = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
          ? ''
          : 'Min 8 chars, 1 mayúsc y 1 número';
        break;
      default:
        error = '';
    }
    return error;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(values).forEach(field => {
      newErrors[field] = validate(field, values[field]);
    });
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(err => err);
    if (!hasError) {
      // Enviar datos
      console.log('Enviado:', values);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-pink-500 text-white py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Formulario</h1>
      </header>

      {/* Main form container */}
      <main className="flex-grow flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md grid gap-6"
        >
          {/* Subheader */}
          <h2 className="text-xl font-semibold text-pink-600 text-center">
            Registrarse
          </h2>

          {/* Datos personales grid */}
          <div className="grid grid-cols-1 gap-4">
            {['nombre', 'apellido', 'cuil', 'email'].map(field => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                    errors[field] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[field] && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Usuario y contraseña */}
          <div className="grid grid-cols-1 gap-4">
            {['usuario', 'contraseña'].map(field => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 capitalize">{field}</label>
                <input
                  type={field === 'contraseña' ? 'password' : 'text'}
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                    errors[field] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[field] && (
                  <span className="text-red-600 text-sm mt-1">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Call to action */}
          <button
            type="submit"
            className="mt-4 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
