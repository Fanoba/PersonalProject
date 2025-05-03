import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { ContentCopy, Delete } from '@mui/icons-material';
import styles from './PromptCard.module.css';

function PromptCard({ prompt, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que quieres eliminar "${prompt.titulo}"?`)) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://personalproject-d7on.onrender.com/prompts/${prompt._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSuccess(true);
      onDelete(prompt._id); // Llama a la función del padre para actualizar el estado
      
    } catch (err) {
      setError(err.message || 'Error al eliminar el prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div" className={styles.title}>
            {prompt.titulo}
          </Typography>
          <Typography variant="body2" className={styles.text}>
            {prompt.description}
          </Typography>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={prompt.text}
            InputProps={{
              readOnly: true,
              className: styles.copyText
            }}
          />
        </CardContent>
        <CardActions className={styles.actions}>
          <Button 
            size="small" 
            startIcon={<ContentCopy />}
            onClick={handleCopy}
            color={copied ? 'success' : 'primary'}
            disabled={loading}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
          <div>
            <IconButton 
              aria-label="delete" 
              onClick={handleDelete} 
              className={styles.deleteButton}
              disabled={loading}
            >
              <Delete />
            </IconButton>
          </div>
        </CardActions>
      </Card>

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
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Prompt eliminado correctamente!
        </Alert>
      </Snackbar>
    </>
  );
}

export default PromptCard;