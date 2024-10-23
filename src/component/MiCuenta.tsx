import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@config/Firebase';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo2.png';

const MiCuenta = ({ handleCloseMiCuenta }) => {
  const [userData, setUserData] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('No se encontraron datos del usuario');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          alert('Error al obtener los datos. Intenta de nuevo más tarde.'); // User feedback
        }
      }
    };

    fetchUserData();
  }, []);

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        handleCloseConfirmDialog();
        await auth.signOut();
        localStorage.removeItem('userId');
        navigate('/');
        alert('Cuenta eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        alert('Hubo un problema al eliminar la cuenta. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: '#242424', p: 3, borderRadius: 2 }}>
      {/* Logo centrado y circular */}
      <Box
        sx={{
          width: 100, // Tamaño del logo
          height: 100,
          borderRadius: '50%', // Hacerlo circular
          overflow: 'hidden',
          mx: 'auto', // Centrar horizontalmente
          mb: 2, // Margen inferior para espacio
        }}
      >
        <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {userData ? (
        <>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Mis datos de Usuario
          </Typography>
          <Typography sx={{ color: '#ccc' }}>
            <strong>Nombre:</strong> {userData.nombre}
          </Typography>
          <Typography sx={{ color: '#ccc' }}>
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography sx={{ color: '#ccc' }}>
            <strong>Estado:</strong> {userData.estado}
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton color="error" onClick={handleOpenConfirmDialog}>
              <DeleteIcon />
            </IconButton>
            <Typography sx={{ color: '#fff', ml: 1 }}>Eliminar Cuenta</Typography>

            <IconButton onClick={handleCloseMiCuenta} color="primary" sx={{ ml: 2 }}>
              <CancelIcon />
            </IconButton>
            <Typography sx={{ color: '#fff', ml: 1 }}>Cancelar</Typography>
          </Box>

          <Dialog
            open={openConfirmDialog}
            onClose={handleCloseConfirmDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"¿Eliminar cuenta?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer y perderás todos tus datos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteAccount} color="error" autoFocus>
                Eliminar
              </Button>
              <Button onClick={handleCloseConfirmDialog} color="primary">Cancelar</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography sx={{ color: '#fff' }}>Cargando mis datos...</Typography>
      )}
    </Box>
  );
};

export default MiCuenta;