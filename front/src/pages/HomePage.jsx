import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import Header from '../components/Header/Header';
import PromptCard from '../components/PromptCard/PromptCard';
import PromptForm from '../components/PromptForm/PromptForm';
import '../styles/Homepage.css'; // Asegúrate de que la ruta sea correcta

const HomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleAddPrompt = (newPrompt) => {
    if (editingPrompt !== null) {
      setPrompts(prompts.map(p => p.id === editingPrompt.id ? newPrompt : p));
    } else {
      setPrompts([...prompts, { ...newPrompt, id: Date.now() }]);
    }
    setEditingPrompt(null);
    setOpenForm(false);
  };

  const handleDeletePrompt = (id) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
  };

  return (
    <div className="home-page"> {/* Contenedor principal */}
      <CssBaseline />
      <Header onAdd={() => setOpenForm(true)} />
      
      <Container maxWidth={false} className="prompts-container">
        {prompts.length === 0 ? (
          <div className="empty-state">
            <h3>No hay prompts creados</h3>
            <p>Crea tu primer prompt haciendo clic en el botón "Nuevo Prompt"</p>
          </div>
        ) : (
          prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={() => {
                setEditingPrompt(prompt);
                setOpenForm(true);
              }}
              onDelete={() => handleDeletePrompt(prompt.id)}
            />
          ))
        )}
        
        <PromptForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditingPrompt(null);
          }}
          onSubmit={handleAddPrompt}
          initialData={editingPrompt}
        />
      </Container>
    </div>
  );
};

export default HomePage;