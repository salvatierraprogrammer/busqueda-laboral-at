import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Modal,
  Chip,
  Divider,
  Tooltip,
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import LockIcon from '@mui/icons-material/Lock';

import Login from '@auth/Login';
import { modalStyle } from '../assets/css/ModalStyle';
import { auth } from '@config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface Centro {
  nombre: string;
  pago: string;
  parciales: string;
  pago_espera?: boolean;
  detalles?: string;
  contacto?: string;
}

interface CardRecomendadoProps {
  datos: Centro[];
}

const CardRecomendado: React.FC<CardRecomendadoProps> = ({ datos }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleCloseLogin = () => setOpenLogin(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSendEmail = (email: string) => {
    if (isAuthenticated) {
      window.location.href = `mailto:${email}`;
    } else {
      setOpenLogin(true);
    }
  };

  if (datos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary',
          backgroundColor: 'rgba(15,110,86,0.04)',
          borderRadius: 3,
          border: '1px dashed rgba(15,110,86,0.2)',
        }}
      >
        <Typography variant="body1">No se encontraron centros recomendados.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {datos.map((centro, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                border: '1px solid rgba(15,110,86,0.12)',
                boxShadow: 'none',
                backgroundColor: '#fff',
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 32px rgba(15,110,86,0.12)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#0f6e56',
                  borderRadius: '12px 12px 0 0',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: '#112420', letterSpacing: '-0.01em', lineHeight: 1.3, fontSize: '1rem' }}
                    >
                      {centro.nombre}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(15,110,86,0.6)', fontSize: '11px' }}>
                      Centro psicológico · Atención Terapéutica
                    </Typography>
                  </Box>
                  <VerifiedIcon sx={{ color: '#0f6e56', fontSize: 18, mt: 0.3, ml: 1, flexShrink: 0 }} />
                </Box>

                {/* Detalles */}
                {centro.detalles && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2.5,
                      lineHeight: 1.6,
                      color: 'rgba(17,36,32,0.6)',
                      fontSize: '13px',
                      backgroundColor: 'rgba(15,110,86,0.04)',
                      borderRadius: 2,
                      p: 1.5,
                      borderLeft: '2px solid rgba(15,110,86,0.25)',
                    }}
                  >
                    {centro.detalles}
                  </Typography>
                )}

                {/* Chips */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
                  {centro.pago && (
                    <Chip
                      icon={<MonetizationOnIcon sx={{ fontSize: '14px !important' }} />}
                      label={centro.pago}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(15,110,86,0.08)',
                        color: '#0f6e56',
                        border: '0.5px solid rgba(15,110,86,0.2)',
                        fontSize: '11px',
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: '#0f6e56' },
                      }}
                    />
                  )}
                  {centro.parciales && (
                    <Chip
                      icon={<AssignmentIcon sx={{ fontSize: '14px !important' }} />}
                      label={centro.parciales}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(24,95,165,0.07)',
                        color: '#185fa5',
                        border: '0.5px solid rgba(24,95,165,0.2)',
                        fontSize: '11px',
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: '#185fa5' },
                      }}
                    />
                  )}
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: '14px !important' }} />}
                    label={centro.pago_espera ? 'Paga la espera' : 'Sin pago espera'}
                    size="small"
                    sx={{
                      backgroundColor: centro.pago_espera ? 'rgba(15,110,86,0.08)' : 'rgba(186,117,23,0.08)',
                      color: centro.pago_espera ? '#0f6e56' : '#ba7517',
                      border: `0.5px solid ${centro.pago_espera ? 'rgba(15,110,86,0.2)' : 'rgba(186,117,23,0.2)'}`,
                      fontSize: '11px',
                      fontWeight: 600,
                      '& .MuiChip-icon': { color: centro.pago_espera ? '#0f6e56' : '#ba7517' },
                    }}
                  />
                </Box>

                <Divider sx={{ mb: 2, borderColor: 'rgba(15,110,86,0.08)' }} />

                {/* Botón */}
                {centro.contacto && (
                  <Tooltip
                    title={!isAuthenticated ? 'Iniciá sesión para ver el contacto' : 'Enviar correo al centro'}
                    placement="top"
                  >
                    <span style={{ width: '100%', display: 'inline-block' }}>
                      <Button
                        variant={isAuthenticated ? 'contained' : 'outlined'}
                        fullWidth
                        startIcon={isAuthenticated ? <EmailIcon /> : <LockIcon />}
                        onClick={() => handleSendEmail(centro.contacto!)}
                        disabled={!centro.contacto}
                        sx={
                          isAuthenticated
                            ? {
                                backgroundColor: '#0f6e56',
                                color: '#fff',
                                borderRadius: 2,
                                py: 1.1,
                                textTransform: 'none',
                                fontSize: '13px',
                                fontWeight: 600,
                                boxShadow: 'none',
                                '&:hover': {
                                  backgroundColor: '#085041',
                                  boxShadow: 'none',
                                },
                              }
                            : {
                                borderColor: 'rgba(15,110,86,0.35)',
                                color: '#0f6e56',
                                borderRadius: 2,
                                py: 1.1,
                                textTransform: 'none',
                                fontSize: '13px',
                                fontWeight: 600,
                                '&:hover': {
                                  borderColor: '#0f6e56',
                                  backgroundColor: 'rgba(15,110,86,0.05)',
                                },
                              }
                        }
                      >
                        {isAuthenticated ? 'Contactar por email' : 'Iniciá sesión para contactar'}
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Box sx={modalStyle}>
          <Login handleClose={handleCloseLogin} />
        </Box>
      </Modal>
    </>
  );
};

export default CardRecomendado;