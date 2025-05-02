import React, { useState } from 'react';

import { AppBar, Toolbar, Button, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.css';
import PromptStructureModal from '../PromptStructureModal/PromptStructureModal';

function Header({ onAdd, onSearch }) {
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <img src="img/LogoFinal.png" alt="Logo" className={styles.logo} />
        <Button className={styles.title} variant="text" color="primary" onClick={() => setOpenInfo(true)}>
          ¿Cómo redactar un buen prompt?
        </Button>
<PromptStructureModal open={openInfo} onClose={() => setOpenInfo(false)} />
        <TextField
          variant="outlined"
          placeholder="Buscar prompt..."
          size="small"
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={styles.searchIcon} />
              </InputAdornment>
            ),
            className: styles.searchInput,
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={onAdd}
          className={styles.addButton}
        >
          Nuevo Prompt
        </Button>
        
      </Toolbar>
    </AppBar>
  );
}

export default Header;
