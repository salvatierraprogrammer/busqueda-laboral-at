import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { auth, db } from '@config/Firebase'; // Asegúrate de que la ruta sea correcta
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface CrearCuentaProps {
  handleClose: () => void;
  handleOpenLogin: () => void;  // Nueva prop para abrir el modal de Login
}

const CrearCuenta: React.FC<CrearCuentaProps> = ({ handleClose, handleOpenLogin }) => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Estado para manejar el éxito

  const handleRegister = async () => {
    setError(null); // Resetear error al iniciar el registro

    // Validaciones
    if (!nombre.trim()) return setError('Por favor, ingresa tu nombre completo.');
    if (!email.trim()) return setError('Por favor, ingresa tu correo electrónico.');
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Ingresa un correo electrónico válido.');
    }

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre,
        userId: user.uid,
        email,
        photo: 'https://example.com/photo.png', // Cambia esto por una URL válida o por una lógica para obtener una foto
        estado: 'activo',
        rol: 'at'
      });

      // Indicar que la cuenta fue creada exitosamente
      setSuccess(true);

      setTimeout(() => {
        // Cierra el modal de CrearCuenta y abre el modal de Login
        handleClose();
        handleOpenLogin();
      }, 2000);
    } catch (error: any) {
      console.error('Error al crear el usuario:', error);
      setError('Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Crear Cuenta</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Cuenta creada con éxito. Abriendo login...</Alert>}
      {!success && (
        <>
          <TextField
            label="Nombre Completo"
            fullWidth
            margin="normal"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="normal"
            variant="outlined"
            type="email"
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
          <TextField
            label="Confirmar Contraseña"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Crear Cuenta
          </Button>
        </>
      )}
    </Box>
  );
};

export default CrearCuenta;