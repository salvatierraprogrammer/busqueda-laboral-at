import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@config/Firebase';
import Login from '@auth/Login';
import CrearCuenta from '@auth/CrearCuenta';
import MiCuenta from '@component/MiCuenta';
import { modalStyle } from '../assets/css/ModalStyle';
import logo from '/logo2.png';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCrearCuenta, setOpenCrearCuenta] = useState(false);
  const [openMiCuenta, setOpenMiCuenta] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'at' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.userRol);
            setUserName(userData.nombre || '');
          } else {
            setUserRole('guest' as any);
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUserRole('guest' as any);
        }
      } else {
        setUserRole('guest' as any);
        setUserName('');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchUserData);
    return () => unsubscribe();
  }, []);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenCrearCuenta = () => { handleCloseLogin(); setOpenCrearCuenta(true); };
  const handleCloseCrearCuenta = () => setOpenCrearCuenta(false);
  const handleOpenMiCuenta = () => { setDrawerOpen(false); setOpenMiCuenta(true); };
  const handleCloseMiCuenta = () => setOpenMiCuenta(false);

  const handleLoginSuccess = (role: 'admin' | 'at') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setOpenLogin(false);
  };

  const handleLogout = async () => {
    const confirmation = window.confirm('¿Estás seguro de que querés cerrar sesión?');
    if (confirmation) {
      await auth.signOut();
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName('');
      navigate('/');
    }
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  // Iniciales del usuario para avatar
  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const navButtonSx = {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '13px',
    borderRadius: 2,
    px: 2,
    py: 0.8,
    letterSpacing: '0.01em',
  };

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: '#112420', display: 'flex', flexDirection: 'column' }}>
      {/* Drawer header */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src={logo} alt="Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <Typography sx={{ color: '#7ecfb3', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em' }}>
            El Canal del AT
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: 'rgba(184,221,212,0.5)', p: 0.5 }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(126,207,179,0.12)' }} />

      {/* Usuario info */}
      {isAuthenticated && (
        <Box sx={{ px: 2.5, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                backgroundColor: 'rgba(126,207,179,0.15)',
                color: '#7ecfb3',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid rgba(126,207,179,0.25)',
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography sx={{ color: '#e8f5f0', fontSize: '14px', fontWeight: 600 }}>
                {userName || 'Mi cuenta'}
              </Typography>
              {userRole === 'admin' && (
                <Chip
                  label="Admin"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(186,117,23,0.15)',
                    color: '#ef9f27',
                    border: '0.5px solid rgba(186,117,23,0.3)',
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Nav items */}
      <List sx={{ flex: 1, px: 1 }}>
        {isAuthenticated ? (
          <>
            {userRole === 'admin' && (
              <ListItem
                button
                onClick={() => { setDrawerOpen(false); alert('Admin panel'); }}
                sx={{ borderRadius: 2, mb: 0.5, '&:hover': { backgroundColor: 'rgba(126,207,179,0.08)' } }}
              >
                <AdminPanelSettingsIcon sx={{ color: '#ef9f27', fontSize: 20, mr: 1.5 }} />
                <ListItemText
                  primary="Panel Admin"
                  primaryTypographyProps={{ sx: { color: '#e8f5f0', fontSize: '14px', fontWeight: 600 } }}
                />
              </ListItem>
            )}
            <ListItem
              button
              onClick={handleOpenMiCuenta}
              sx={{ borderRadius: 2, mb: 0.5, '&:hover': { backgroundColor: 'rgba(126,207,179,0.08)' } }}
            >
              <PersonOutlineIcon sx={{ color: '#7ecfb3', fontSize: 20, mr: 1.5 }} />
              <ListItemText
                primary="Mi cuenta"
                primaryTypographyProps={{ sx: { color: '#e8f5f0', fontSize: '14px', fontWeight: 600 } }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(226,75,74,0.08)' } }}
            >
              <LogoutIcon sx={{ color: 'rgba(240,149,149,0.7)', fontSize: 20, mr: 1.5 }} />
              <ListItemText
                primary="Cerrar sesión"
                primaryTypographyProps={{ sx: { color: 'rgba(240,149,149,0.8)', fontSize: '14px', fontWeight: 600 } }}
              />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            onClick={() => { setDrawerOpen(false); handleOpenLogin(); }}
            sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'rgba(126,207,179,0.08)' } }}
          >
            <PersonOutlineIcon sx={{ color: '#7ecfb3', fontSize: 20, mr: 1.5 }} />
            <ListItemText
              primary="Iniciar sesión"
              primaryTypographyProps={{ sx: { color: '#e8f5f0', fontSize: '14px', fontWeight: 600 } }}
            />
          </ListItem>
        )}
      </List>

      <Divider sx={{ borderColor: 'rgba(126,207,179,0.08)' }} />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: 'rgba(184,221,212,0.25)', fontSize: '11px' }}>
          El Canal del Acompañante Terapéutico
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: '#112420',
          borderBottom: '1px solid rgba(126,207,179,0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 60, sm: 64 }, px: { xs: 2, sm: 3 } }}>
          {/* Logo + nombre */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(126,207,179,0.2)',
                flexShrink: 0,
              }}
            >
              <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '14px', sm: '15px' },
                  color: '#e8f5f0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {isMobile ? 'El Canal del AT' : 'El Canal del Acompañante Terapéutico'}
              </Typography>
              {!isMobile && (
                <Typography sx={{ fontSize: '11px', color: 'rgba(126,207,179,0.6)', letterSpacing: '0.02em' }}>
                  Comunidad · Información · Trabajo
                </Typography>
              )}
            </Box>
          </Box>

          {/* Desktop nav */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isAuthenticated ? (
                <Button
                  onClick={handleOpenLogin}
                  variant="outlined"
                  sx={{
                    ...navButtonSx,
                    borderColor: 'rgba(126,207,179,0.35)',
                    color: '#7ecfb3',
                    '&:hover': {
                      borderColor: '#7ecfb3',
                      backgroundColor: 'rgba(126,207,179,0.08)',
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
              ) : (
                <>
                  {userRole === 'admin' && (
                    <Button
                      onClick={() => alert('Admin panel')}
                      startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '16px !important' }} />}
                      sx={{
                        ...navButtonSx,
                        color: '#ef9f27',
                        border: '1px solid rgba(186,117,23,0.3)',
                        '&:hover': { backgroundColor: 'rgba(186,117,23,0.08)', borderColor: '#ef9f27' },
                      }}
                    >
                      Admin
                    </Button>
                  )}
                  <Button
                    onClick={handleOpenMiCuenta}
                    startIcon={
                      <Avatar
                        sx={{
                          width: 22,
                          height: 22,
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: 'rgba(126,207,179,0.2)',
                          color: '#7ecfb3',
                        }}
                      >
                        {initials}
                      </Avatar>
                    }
                    sx={{
                      ...navButtonSx,
                      color: '#e8f5f0',
                      border: '1px solid rgba(126,207,179,0.2)',
                      '&:hover': { backgroundColor: 'rgba(126,207,179,0.08)', borderColor: 'rgba(126,207,179,0.4)' },
                    }}
                  >
                    {userName ? userName.split(' ')[0] : 'Mi cuenta'}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    startIcon={<LogoutIcon sx={{ fontSize: '15px !important' }} />}
                    sx={{
                      ...navButtonSx,
                      color: 'rgba(240,149,149,0.75)',
                      border: '1px solid rgba(240,149,149,0.2)',
                      '&:hover': { backgroundColor: 'rgba(226,75,74,0.08)', borderColor: 'rgba(240,149,149,0.4)' },
                    }}
                  >
                    Salir
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: '#7ecfb3',
                border: '1px solid rgba(126,207,179,0.2)',
                borderRadius: 2,
                p: 0.75,
                '&:hover': { backgroundColor: 'rgba(126,207,179,0.08)' },
              }}
            >
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
      >
        {drawerContent}
      </Drawer>

      {/* Modales */}
      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Box sx={modalStyle}>
          <Login
            handleClose={handleCloseLogin}
            handleOpenCrearCuenta={handleOpenCrearCuenta}
            setIsAuthenticated={setIsAuthenticated}
            handleLoginSuccess={handleLoginSuccess}
          />
        </Box>
      </Modal>

      <Modal open={openCrearCuenta} onClose={handleCloseCrearCuenta}>
        <Box sx={modalStyle}>
          <CrearCuenta handleClose={handleCloseCrearCuenta} handleOpenLogin={handleOpenLogin} />
        </Box>
      </Modal>

      <Modal open={openMiCuenta} onClose={handleCloseMiCuenta}>
        <Box sx={modalStyle}>
          <MiCuenta handleCloseMiCuenta={handleCloseMiCuenta} />
        </Box>
      </Modal>
    </>
  );
};

export default Header;