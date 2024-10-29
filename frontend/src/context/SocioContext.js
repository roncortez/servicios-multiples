import React, { createContext, useEffect, useState } from 'react';

export const SocioContext = createContext();

export const SocioProvider = ({ children }) => {
  const [socio, setSocio] = useState(() => {
    const savedSocio = localStorage.getItem('socio');
    return savedSocio ? JSON.parse(savedSocio) : null;
  });

  const [registro, setRegistro] = useState(() => {
    const savedRegistro = localStorage.getItem('registro');
    return savedRegistro ? JSON.parse(savedRegistro) : false;
  });

  const updateSocio = (nuevoSocio) => {
    setSocio(nuevoSocio);
    localStorage.setItem('socio', JSON.stringify(nuevoSocio));
  };

  const updateRegistro = (nuevoRegistro) => {
    setRegistro(nuevoRegistro);
    localStorage.setItem('registro', JSON.stringify(nuevoRegistro));
  };

  useEffect(() => {

     // Limpiar el localStorage y el estado al cargar el componente
     limpiarDatos();
     
    const handleStorageChange = (event) => {
      if (event.key === 'socio') {
        setSocio(event.newValue ? JSON.parse(event.newValue) : null);
      } else if (event.key === 'registro') {
        setRegistro(event.newValue ? JSON.parse(event.newValue) : false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Limpiar el localStorage y el estado cuando sea necesario
  const limpiarDatos = () => {
    setSocio(null);
    setRegistro(false);
    localStorage.removeItem('socio');
    localStorage.removeItem('registro');
  };

  return (
    <SocioContext.Provider value={{ socio, setSocio: updateSocio, registro, setRegistro: updateRegistro, limpiarDatos }}>
      {children}
    </SocioContext.Provider>
  );
};
