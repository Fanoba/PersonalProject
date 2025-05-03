import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import styles from './PromptForm.module.css';

function PromptForm({ open, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.titulo || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [text, setText] = useState(initialData?.text || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://personalproject-d7on.onrender.com/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: title,
          description,
          text
        })
      });

      if (!response.ok) {
        throw new Error('Error al guardar el prompt');
      }

      const data = await response.json();
      onSubmit(data); // Llama a la función del padre para actualizar el estado
      setSuccess(true);
      setTitle('');
      setDescription('');
      setText('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className={styles.dialogTitle}>
          {initialData ? 'Editar Prompt' : 'Nuevo Prompt'}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Texto para copiar"
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button 
            onClick={onClose} 
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            className={styles.saveButton}
            disabled={loading || !title.trim()}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificaciones */}
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Prompt guardado exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PromptForm;