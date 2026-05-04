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
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        setOpenConfirmDialog(false);
        await auth.signOut();
        localStorage.removeItem('userId');
        navigate('/');
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        alert('Hubo un problema al eliminar la cuenta. Por favor, reingresá y volvé a intentarlo.');
      }
    }
  };

  // Iniciales para el avatar
  const initials = userData?.nombre
    ? userData.nombre.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const rolLabel = userData?.userRol === 'admin' ? 'Administrador' : 'Acompañante Terapéutico';
  const rolColor = userData?.userRol === 'admin' ? '#ef9f27' : '#7ecfb3';
  const rolBg = userData?.userRol === 'admin' ? 'rgba(186,117,23,0.12)' : 'rgba(126,207,179,0.12)';
  const rolBorder = userData?.userRol === 'admin' ? 'rgba(186,117,23,0.3)' : 'rgba(126,207,179,0.3)';

  return (
    <Box
      sx={{
        backgroundColor: '#112420',
        borderRadius: 3,
        p: 0,
        overflow: 'hidden',
        minWidth: { xs: 300, sm: 380 },
      }}
    >
      {/* Header con gradiente */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f6e56 0%, #1a3530 100%)',
          p: 3,
          pb: 5,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleCloseMiCuenta}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'rgba(232,245,240,0.5)',
            '&:hover': { color: '#e8f5f0', backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Typography
          sx={{
            color: 'rgba(232,245,240,0.6)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          Mi cuenta
        </Typography>

        {/* Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 700,
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography
              sx={{ color: '#fff', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}
            >
              {userData?.nombre || '...'}
            </Typography>
            {userData && (
              <Chip
                label={rolLabel}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: rolBg,
                  color: rolColor,
                  border: `0.5px solid ${rolBorder}`,
                  letterSpacing: '0.03em',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3, mt: -2 }}>
        {userData ? (
          <>
            {/* Card de datos */}
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(126,207,179,0.15)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {/* Nombre */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
                <PersonOutlineIcon sx={{ fontSize: 18, color: 'rgba(126,207,179,0.5)' }} />
                <Box>
                  <Typography sx={{ fontSize: '11px', color: 'rgba(184,221,212,0.45)', letterSpacing: '0.04em' }}>
                    NOMBRE
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#e8f5f0', fontWeight: 500 }}>
                    {userData.nombre}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: 'rgba(126,207,179,0.08)' }} />

              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
                <EmailOutlinedIcon sx={{ fontSize: 18, color: 'rgba(126,207,179,0.5)' }} />
                <Box>
                  <Typography sx={{ fontSize: '11px', color: 'rgba(184,221,212,0.45)', letterSpacing: '0.04em' }}>
                    EMAIL
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#e8f5f0', fontWeight: 500 }}>
                    {userData.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: 'rgba(126,207,179,0.08)' }} />

              {/* Estado */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
                <BadgeOutlinedIcon sx={{ fontSize: 18, color: 'rgba(126,207,179,0.5)' }} />
                <Box>
                  <Typography sx={{ fontSize: '11px', color: 'rgba(184,221,212,0.45)', letterSpacing: '0.04em' }}>
                    ESTADO
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#7ecfb3',
                      }}
                    />
                    <Typography sx={{ fontSize: '14px', color: '#e8f5f0', fontWeight: 500 }}>
                      {userData.estado || 'Activo'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Botón eliminar */}
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DeleteOutlineIcon sx={{ fontSize: '16px !important' }} />}
                onClick={() => setOpenConfirmDialog(true)}
                sx={{
                  borderColor: 'rgba(240,149,149,0.25)',
                  color: 'rgba(240,149,149,0.65)',
                  borderRadius: 2,
                  py: 1,
                  textTransform: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'rgba(240,149,149,0.5)',
                    backgroundColor: 'rgba(226,75,74,0.06)',
                    color: '#f09595',
                  },
                }}
              >
                Eliminar mi cuenta
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography sx={{ color: 'rgba(184,221,212,0.45)', fontSize: '14px' }}>
              Cargando datos...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Dialog de confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a3530',
            borderRadius: 3,
            border: '0.5px solid rgba(126,207,179,0.15)',
            color: '#e8f5f0',
          },
        }}
      >
        <DialogTitle sx={{ color: '#e8f5f0', fontWeight: 700, pb: 1 }}>
          ¿Eliminar cuenta?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(184,221,212,0.7)', fontSize: '14px', lineHeight: 1.6 }}>
            Esta acción es <strong style={{ color: '#f09595' }}>permanente e irreversible</strong>.
            Perderás todos tus datos y no podrás recuperar tu cuenta.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            sx={{
              color: 'rgba(184,221,212,0.7)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { color: '#e8f5f0' },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            sx={{
              backgroundColor: 'rgba(226,75,74,0.15)',
              color: '#f09595',
              border: '0.5px solid rgba(240,149,149,0.3)',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'rgba(226,75,74,0.25)',
                boxShadow: 'none',
              },
            }}
          >
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MiCuenta;