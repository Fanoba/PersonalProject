import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import styles from './PromptForm.module.css';

function PromptForm({ open, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [text, setText] = useState(initialData?.text || '');

  const handleSubmit = () => {
    onSubmit({ title, description, text, id: initialData?.id });
    setTitle('');
    setDescription('');
    setText('');
  };

  return (
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
        />
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className={styles.saveButton}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PromptForm;