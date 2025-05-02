import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton,
  TextField
} from '@mui/material';
import { Edit, ContentCopy, Delete } from '@mui/icons-material';
import styles from './PromptCard.module.css';

function PromptCard({ prompt, onEdit, onDelete }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div" className={styles.title}>
          {prompt.title}
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
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </Button>
        <div>
          <IconButton aria-label="edit" onClick={onEdit} className={styles.editButton}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDelete} className={styles.deleteButton}>
            <Delete />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default PromptCard;