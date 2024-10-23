import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { auth } from '@config/firebase';
import { sendEmailWithFirebase } from '../service/firebaseEmailService';

function ModalEnviarCv({ handleClose, userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState(
    "Estoy interesado/a en formar parte de su equipo, tengo experiencia tanto en lo público, privado y particular en salud mental."
  );
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const emailContent = {
        subject: 'Búsqueda Laboral como Acompañante Terapéutico',
        body: description,
        from: auth.currentUser.email,
        to: 'salvaierraprogrammer@mail.com', // Aquí pondrías el email del empleador
      };

      await sendEmailWithFirebase(emailContent); // Asegúrate de que esta función esté bien configurada

      setEmailSent(true);
      handleClose();
    } catch (error) {
      setError('Error al enviar el correo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Enviar CV</Typography>
      <TextField
        label="Tu Correo"
        fullWidth
        margin="normal"
        variant="outlined"
        value={auth.currentUser.email}
        disabled
      />
      <TextField
        label="Descripción"
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar
        </Button>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {emailSent && <Typography color="success">Correo enviado correctamente.</Typography>}
    </Box>
  );
}

export default ModalEnviarCv;