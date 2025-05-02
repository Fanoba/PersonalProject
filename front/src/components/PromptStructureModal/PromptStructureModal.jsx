import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './PrompStructureModal.module.css';

export default function PromptStructureModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="prompt-structure-title">
      <Box className={styles.modalContent}>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <Typography className={styles.modalTitle} variant="h6" component="h2">
          Estructura para redactar un buen prompt
        </Typography>

        <Typography paragraph>
          <strong>1. Objetivo principal:</strong><br />
          ¿Qué quieres que ChatGPT haga? (Escribir, resumir, generar ideas, traducir, programar, etc.)
        </Typography>

        <Typography paragraph>
          <strong>2. Contexto:</strong><br />
          ¿Sobre qué trata la tarea? ¿Cuál es el tema, situación o problema?
        </Typography>

        <Typography paragraph>
          <strong>3. Detalles específicos:</strong><br />
          Proporciona datos clave, ejemplos, formato esperado, tono deseado, limitaciones de longitud, etc.
        </Typography>

        <Typography paragraph>
          <strong>4. Resultado esperado:</strong><br />
          ¿Qué tipo de respuesta necesitas? (Lista, párrafo, código, poema, email, etc.)
        </Typography>

        <Typography paragraph>
          <strong>5. Estilo o tono (opcional):</strong><br />
          ¿Quieres que suene profesional, informal, divertido, técnico, etc.?
        </Typography>

        <Typography paragraph>
          <strong>6. Lenguaje (opcional):</strong><br />
          ¿En qué idioma necesitas la respuesta?
        </Typography>
      </Box>
    </Modal>
  );
}
