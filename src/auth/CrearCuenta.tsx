import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { auth, db } from '@config/Firebase'; // Asegúrate de que la ruta sea correcta
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../../public/logo2.png';
import TerminosYCondiciones from '../component/TerminosYCondiciones';

interface CrearCuentaProps {
  handleClose: () => void;
  handleOpenLogin: () => void; // Nueva prop para abrir el modal de Login
}

const CrearCuenta: React.FC<CrearCuentaProps> = ({ handleClose, handleOpenLogin }) => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Estado para manejar el éxito
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false); // Estado para manejar los términos
  const [termsOpen, setTermsOpen] = useState<boolean>(false); // Estado para mostrar los términos

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

    if (!acceptTerms) {
      return setError('Debes aceptar los términos y condiciones.');
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
        rol: 'at',
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
      <Typography variant="h6" >Crear Cuenta</Typography>
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
         InputProps={{
           style: { backgroundColor: '#fff', color: '#000' }  // Fondo blanco y texto negro
         }}
         InputLabelProps={{
           style: { color: '#ccc' }  // Color del label claro para buen contraste
         }}
       />
       <TextField
         label="Correo Electrónico"
         fullWidth
         margin="normal"
         variant="outlined"
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         InputProps={{
           style: { backgroundColor: '#fff', color: '#000' } // Fondo blanco y texto negro
         }}
         InputLabelProps={{
           style: { color: '#ccc' }  // Color del label claro
         }}
       />
       <TextField
         label="Contraseña"
         type="password"
         fullWidth
         margin="normal"
         variant="outlined"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         InputProps={{
           style: { backgroundColor: '#fff', color: '#000' } // Fondo blanco y texto negro
         }}
         InputLabelProps={{
           style: { color: '#ccc' }  // Color del label claro
         }}
       />
       <TextField
         label="Confirmar Contraseña"
         type="password"
         fullWidth
         margin="normal"
         variant="outlined"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         InputProps={{
           style: { backgroundColor: '#fff', color: '#000' } // Fondo blanco y texto negro
         }}
         InputLabelProps={{
           style: { color: '#00000' }  // Color del label claro
         }}
       />
 
       {/* Checkbox de Términos y Condiciones */}
       <FormControlLabel
         control={
           <Checkbox
             checked={acceptTerms}
             onChange={(e) => setAcceptTerms(e.target.checked)}
             color="primary"
           />
         }
         label={
           <Typography sx={{ color: '#fff' }}> {/* Texto blanco */}
             Acepto los{' '}
             <Button onClick={() => setTermsOpen(true)} color="secondary">
               Términos y Condiciones
             </Button>
           </Typography>
         }
       />
 
       <Button
         variant="contained"
         sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}  // Botón azul con texto blanco y hover
         fullWidth
         onClick={handleRegister}
         disabled={!acceptTerms}
       >
         Crear Cuenta
       </Button>
     </>
      )}

      {/* Modal de Términos y Condiciones */}
      <Dialog open={termsOpen} onClose={() => setTermsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Términos y Condiciones</DialogTitle>
        <DialogContent sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Typography variant="body2">
            <TerminosYCondiciones />
          </Typography>
          <Button onClick={() => setTermsOpen(false)} color="primary" fullWidth>
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CrearCuenta;