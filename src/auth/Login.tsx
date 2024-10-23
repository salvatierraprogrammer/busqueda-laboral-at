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
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(''); // Reiniciar el mensaje de éxito al intentar iniciar sesión

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda el ID y el rol del usuario si lo necesitas
      localStorage.setItem('userId', user.uid);
      // Aquí podrías agregar lógica para almacenar el rol del usuario.

      setIsAuthenticated(true); // Actualiza el estado de autenticación
      setSuccessMessage('Inicio de sesión correctamente'); // Establecer el mensaje de éxito
      handleClose(); // Cierra el modal
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      setError(error.message); // Muestra el mensaje de error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/'); // Redirige si el usuario ya está autenticado
      }
    });

    return () => unsubscribe(); // Limpia la suscripción
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
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
        </Button>
        {error && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}
        {successMessage && <Typography color="success" variant="body2" sx={{ marginTop: 2 }}>{successMessage}</Typography>} {/* Mensaje de éxito */}
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