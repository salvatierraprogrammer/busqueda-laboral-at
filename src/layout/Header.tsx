import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Login from '@auth/Login';
import CrearCuenta from '@auth/CrearCuenta';
import { Box } from '@mui/material';
import { modalStyle } from '../assets/css/ModalStyle';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'; // Asegúrate de que estas funciones estén importadas
import { onAuthStateChanged } from 'firebase/auth'; // También asegúrate de importar esta función
import { auth, db } from '@config/Firebase'; // Asegúrate de importar auth y db

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCrearCuenta, setOpenCrearCuenta] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'at' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.userRol); // Corregido el nombre de la función
          } else {
            console.error('No se encontró el documento del usuario');
            setUserRole('guest'); // Corregido el nombre de la función
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUserRole('guest'); // Corregido el nombre de la función
        }
      } else {
        setUserRole('guest'); // Corregido el nombre de la función
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

  return (
    <>
      <AppBar sx={{ backgroundColor: '#242424' }}>
        <Toolbar sx={{ width: '90%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            El canal del Acompañante Terapeutico
          </Typography>
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
                <Button sx={{ mx: 1 }} color="inherit" variant="outlined" onClick={() => alert('Mi cuenta clicked!')}>
                  Mi cuenta
                </Button>
                <Button color="inherit" variant="outlined" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Box>
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
    </>
  );
};

export default Header;