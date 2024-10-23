// src/component/Search.tsx
import React from 'react';
import { Container, TextField } from '@mui/material';

interface SearchProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ onSearchChange }: SearchProps) {
  return (
    <Container>
    <TextField
      label="Buscar centro"
      variant="outlined"
      fullWidth
      onChange={onSearchChange} // Llamar a la función de búsqueda al cambiar el valor
      style={{ marginBottom: 20, backgroundColor: "#fff" }}
    />
    </Container>
  );
}

export default Search;