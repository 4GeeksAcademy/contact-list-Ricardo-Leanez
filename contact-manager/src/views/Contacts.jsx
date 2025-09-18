import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
  const { contacts, loading, error } = useAppContext();

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando contactos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Mis Contactos</h1>
        <Link to="/add-contact" className="btn-primary">
          <i className="fas fa-plus"></i> Nuevo Contacto
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-address-book"></i>
          <h2>No tienes contactos</h2>
          <p>Comienza agregando tu primer contacto</p>
          <Link to="/add-contact" className="btn-primary">
            Agregar Contacto
          </Link>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;