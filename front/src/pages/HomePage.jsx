import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, CircularProgress,Button } from '@mui/material';
import Header from '../components/Header/Header';
import PromptCard from '../components/PromptCard/PromptCard';
import PromptForm from '../components/PromptForm/PromptForm';
import '../styles/Homepage.css';

const HomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener todos los prompts
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('https://personalproject-d7on.onrender.com/allprompts');
        if (!response.ok) throw new Error('Error al cargar los prompts');
        const data = await response.json();
        setPrompts(data);
        setFilteredPrompts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  // Filtrar prompts según el término de búsqueda
  useEffect(() => {
    const results = prompts.filter(prompt =>
      prompt.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrompts(results);
  }, [searchTerm, prompts]);

  const handleAddPrompt = (newPrompt) => {
    if (editingPrompt !== null) {
      const updatedPrompts = prompts.map(p => p._id === editingPrompt._id ? newPrompt : p);
      setPrompts(updatedPrompts);
    } else {
      setPrompts([newPrompt, ...prompts]);
    }
    setEditingPrompt(null);
    setOpenForm(false);
  };

  const handleDeletePrompt = (deletedId) => {
    setPrompts(prompts.filter(prompt => prompt._id !== deletedId));
  };

  return (
    <div className="home-page">
      <CssBaseline />
      <Header 
        onAdd={() => setOpenForm(true)} 
        onSearch={(term) => setSearchTerm(term)}
      />
      
      <Container maxWidth={false} className="prompts-container">
        {loading ? (
          <div className="loading-state">
            <CircularProgress />
            <p>Cargando prompts...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <h3>Error al cargar los prompts</h3>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="empty-state">
            <h3>
              {searchTerm ? 
                'No se encontraron prompts' : 
                'No hay prompts creados'
              }
            </h3>
            <p>
              {searchTerm ?
                'Intenta con otro término de búsqueda' :
                'Crea tu primer prompt haciendo clic en "Nuevo Prompt"'
              }
            </p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              onEdit={() => {
                setEditingPrompt(prompt);
                setOpenForm(true);
              }}
              onDelete={handleDeletePrompt}
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