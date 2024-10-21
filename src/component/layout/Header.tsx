import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar  sx={{ backgroundColor: '#242424' }}>
      <Toolbar sx={{ width: '100%', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          El canal del Acompañante Terapeutico 
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;