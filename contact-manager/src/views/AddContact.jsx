import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { contacts, createContact, updateContact } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // Cargar datos del contacto si estamos editando
  useEffect(() => {
    if (isEditing) {
      const contactToEdit = contacts.find(contact => contact.id === parseInt(id));
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name || '',
          email: contactToEdit.email || '',
          phone: contactToEdit.phone || '',
          address: contactToEdit.address || ''
        });
      }
    }
  }, [id, contacts, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success = false;
    if (isEditing) {
      success = await updateContact(id, formData);
    } else {
      success = await createContact(formData);
    }

    setLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>{isEditing ? 'Editar Contacto' : 'Nuevo Contacto'}</h1>
        <button onClick={() => navigate('/')} className="btn-secondary">
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Contacto')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;