import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@config/Firebase';
import Login from '@auth/Login';
import CrearCuenta from '@auth/CrearCuenta';
import MiCuenta from '@component/MiCuenta'; // Importar el nuevo componente MiCuenta
import { modalStyle } from '../assets/css/ModalStyle';
import logo from '/logo2.png';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCrearCuenta, setOpenCrearCuenta] = useState(false);
  const [openMiCuenta, setOpenMiCuenta] = useState(false); // Estado para abrir/cerrar el modal de Mi cuenta
  const [userRole, setUserRole] = useState<'admin' | 'at' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para el Drawer
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)'); // Pantalla menor de 600px

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.userRol);
          } else {
            console.error('No se encontró el documento del usuario');
            setUserRole('guest');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUserRole('guest');
        }
      } else {
        setUserRole('guest');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenCrearCuenta = () => {
    handleCloseLogin();
    setOpenCrearCuenta(true);
  };
  const handleCloseCrearCuenta = () => setOpenCrearCuenta(false);
  const handleOpenMiCuenta = () => setOpenMiCuenta(true); // Abrir modal Mi cuenta
  const handleCloseMiCuenta = () => setOpenMiCuenta(false); // Cerrar modal Mi cuenta

  const handleLoginSuccess = (role: 'admin' | 'at') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setOpenLogin(false);
  };

  const handleLogout = async () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmation) {
      await auth.signOut();
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/');
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '70%', height: 'auto', objectFit: 'contain' }} // Ajustar el tamaño
        />
      </Box>
      <List>
        {isAuthenticated ? (
          <>
            {userRole === 'admin' && (
              <ListItem button onClick={() => alert('Admin button clicked!')}>
                <ListItemText primary="Admin" sx={{ color: '#fff' }} />
              </ListItem>
            )}
            <ListItem button onClick={handleOpenMiCuenta }> {/* Abre modal Mi cuenta */}
              <ListItemText primary="Mi cuenta" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Cerrar Sesión" sx={{ color: '#fff' }} />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={handleOpenLogin}>
            <ListItemText primary="Iniciar Sesión" sx={{ color: '#fff' }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={{ backgroundColor: '#242424' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }} // Tamaño del logo
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
              {isMobile ? 'El canal del AT' : 'El canal del Acompañante Terapeutico'}
            </Typography>
          </Box>
          
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: { backgroundColor: '#242424' },
                }}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isAuthenticated ? (
                <Button color="inherit" variant="outlined" onClick={handleOpenLogin}>
                  Iniciar Sesión
                </Button>
              ) : (
                <>
                  {userRole === 'admin' && (
                    <Button sx={{ mx: 1 }} color="inherit" variant="outlined" onClick={() => alert('Admin button clicked!')}>
                      Admin
                    </Button>
                  )}
                  <Button sx={{ mx: 1 }} color="inherit" variant="outlined" onClick={handleOpenMiCuenta}>
                    Mi cuenta
                  </Button>
                  <Button color="inherit" variant="outlined" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

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
          <CrearCuenta
            handleClose={handleCloseCrearCuenta}
            handleOpenLogin={handleOpenLogin}
          />
        </Box>
      </Modal>

      {/* Modal de Mi cuenta */}
      <Modal open={openMiCuenta} onClose={handleCloseMiCuenta}>
        <Box sx={modalStyle}>
          <MiCuenta handleCloseMiCuenta={handleCloseMiCuenta}/> {/* Mostrar el componente MiCuenta */}
        </Box>
      </Modal>
    </>
  );
};

export default Header;