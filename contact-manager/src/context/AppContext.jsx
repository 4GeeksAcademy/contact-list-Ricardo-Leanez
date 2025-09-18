import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://playground.4geeks.com/contact';
  const AGENDA_SLUG = 'Ricarlea2000';

  // Obtener todos los contactos
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
      
      if (!response.ok) {
        // Si el usuario no existe, lo creamos
        if (response.status === 404) {
          await createAgenda();
          setContacts([]);
          return;
        }
        throw new Error('Error al cargar los contactos');
      }
      
      const data = await response.json();
      setContacts(data.contacts || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear la agenda si no existe
  const createAgenda = async () => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la agenda');
      }
      
      console.log('Agenda creada exitosamente');
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  // Crear un nuevo contacto
  const createContact = async (contactData) => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el contacto');
      }
      
      await fetchContacts(); // Recargar la lista de contactos
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
      return false;
    }
  };

  // Actualizar un contacto - URL CORREGIDA
  const updateContact = async (contactId, contactData) => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el contacto');
      }
      
      await fetchContacts(); // Recargar la lista de contactos
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
      return false;
    }
  };

  // Eliminar un contacto - URL CORREGIDA
  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el contacto');
      }
      
      await fetchContacts(); // Recargar la lista de contactos
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
      return false;
    }
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    fetchContacts();
  }, []);

  const value = {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};