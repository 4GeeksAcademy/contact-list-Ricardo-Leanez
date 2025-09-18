import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Modal from './Modal';

const ContactCard = ({ contact }) => {
  const [showModal, setShowModal] = useState(false);
  const { deleteContact } = useAppContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/add-contact/${contact.id}`);
  };

  const handleDelete = async () => {
    const success = await deleteContact(contact.id);
    if (success) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="contact-card">
        <div className="contact-info">
          <div className="contact-avatar">
            {contact.name ? contact.name[0].toUpperCase() : '?'}
          </div>
          <div className="contact-details">
            <h3>{contact.name}</h3>
            <p>
              <i className="fas fa-phone"></i> 
              {contact.phone || 'Sin teléfono'}
            </p>
            <p>
              <i className="fas fa-envelope"></i> 
              {contact.email || 'Sin email'}
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> 
              {contact.address || 'Sin dirección'}
            </p>
          </div>
        </div>
        <div className="contact-actions">
          <button onClick={handleEdit} className="btn-edit">
            <i className="fas fa-edit"></i> Editar
          </button>
          <button onClick={() => setShowModal(true)} className="btn-delete">
            <i className="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>

      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar a ${contact.name}?`}
      />
    </>
  );
};

export default ContactCard;