import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar, Box, Modal } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Login from '@auth/Login'; // Asegúrate de que la ruta sea correcta
import { modalStyle } from '../assets/css/ModalStyle';
import { auth } from '@config/Firebase'; // Asegúrate de que la ruta es correcta
import { onAuthStateChanged } from "firebase/auth";

function CardRecomendado({ datos }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  // Verifica el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Si hay un usuario, isAuthenticated será true
    });

    return () => unsubscribe(); // Limpia el suscriptor al desmontar el componente
  }, []);

  const handleSendEmail = (email) => {
    if (isAuthenticated) {
      window.location.href = `mailto:${email}`; // Abre el cliente de correo con la dirección proporcionada
    } else {
      alert('Debes iniciar sesión para enviar un email.');
      handleOpenLogin();
    }
  };

  return (
    <Grid container spacing={2}>
      {datos.map((centro, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Typography variant="h5">{centro.nombre}</Typography>
              </Box>
              <Typography color="textSecondary">
                Pago: {centro.pago}
              </Typography>
              <Typography color="textSecondary">
                Parciales: {centro.parciales}
              </Typography>
              <Typography>
                Pago a la espera: {centro.pago_espera ? 'Sí' : 'No'}
              </Typography>
              {centro.detalles && (
                <Typography variant="body2">
                  Detalles: {centro.detalles}
                </Typography>
              )}
              {centro.contacto && ( // Asegúrate de que centro.contacto contenga el email
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSendEmail(centro.contacto)}
                  sx={{ marginTop: 2 }}
                >
                  Enviar Email
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Modal de inicio de sesión */}
      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Box sx={modalStyle}>
          <Login handleClose={handleCloseLogin} />
        </Box>
      </Modal>
    </Grid>
  );
}

export default CardRecomendado;