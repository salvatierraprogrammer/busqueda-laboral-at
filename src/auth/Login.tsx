import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '@config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({ handleClose, handleOpenCrearCuenta, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem('userId', user.uid);
      setIsAuthenticated(true);
      setSuccessMessage('Inicio de sesión correctamente');
      handleClose();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Cuenta no registrada. Verifica tu correo.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Usuario o contraseña no coinciden. Vuelve a intentarlo.');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate, setIsAuthenticated]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ style: { backgroundColor: '#fff', color: '#000' } }}
          InputLabelProps={{ style: { color: '#000' } }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ style: { backgroundColor: '#fff', color: '#000' } }}
          InputLabelProps={{ style: { color: '#000' } }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
        </Button>
        {error && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}
        {successMessage && <Typography color="success" variant="body2" sx={{ marginTop: 2 }}>{successMessage}</Typography>}
        <Typography variant="body2" sx={{ marginTop: 2, color: 'white' }}>
          ¿No tienes cuenta?{' '}
          <Button color="secondary" onClick={handleOpenCrearCuenta}>
            Crear Cuenta
          </Button>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;