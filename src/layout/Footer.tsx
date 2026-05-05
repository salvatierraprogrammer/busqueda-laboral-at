import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo: '',
    mensaje: '',
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const tiposConsulta = [
    'Consulta general',
    'Sugerencia de centro',
    'Denuncia',
    'Otro',
  ];

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    if (!formData.mensaje.trim()) newErrors.mensaje = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`[${formData.tipo || 'Consulta'}] de ${formData.nombre}`);
    const body = encodeURIComponent(`${formData.mensaje}\n\nRemitente: ${formData.nombre}\nEmail: ${formData.email}`);
    window.location.href = `mailto:acompanianteterapeuticoweb@gmail.com?subject=${subject}&body=${body}`;
    setSnackOpen(true);
    setFormData({ nombre: '', email: '', tipo: '', mensaje: '' });
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'rgba(255,255,255,0.06)',
      color: '#e8f5f0',
      '& fieldset': { borderColor: 'rgba(126,207,179,0.25)' },
      '&:hover fieldset': { borderColor: 'rgba(126,207,179,0.5)' },
      '&.Mui-focused fieldset': { borderColor: '#7ecfb3' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(184,221,212,0.6)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#7ecfb3' },
    '& .MuiInputBase-input': { color: '#e8f5f0' },
    '& .MuiInputBase-input::placeholder': { color: 'rgba(232,245,240,0.3)' },
    '& .MuiSelect-icon': { color: 'rgba(184,221,212,0.6)' },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#112420',
        color: '#e8f5f0',
        pt: 6,
        pb: 3,
        mt: 8,
        borderTop: '1px solid rgba(126,207,179,0.12)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Columna izquierda — Info */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#7ecfb3',
                letterSpacing: '-0.02em',
                mb: 1,
              }}
            >
              El Canal del AT
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(184,221,212,0.65)', mb: 3, lineHeight: 1.7 }}
            >
              Espacio creado por y para la comunidad de Acompañantes Terapéuticos.
              Aquí encontrás información real sobre centros, condiciones laborales y más.
            </Typography>

            <Divider sx={{ borderColor: 'rgba(126,207,179,0.12)', mb: 3 }} />

            <Typography
              variant="overline"
              sx={{ color: '#7ecfb3', fontSize: '11px', letterSpacing: '0.1em' }}
            >
              Contacto directo
            </Typography>
            <Link
              href="mailto:acompanianteterapeuticoweb@gmail.com"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'rgba(184,221,212,0.8)',
                fontSize: '14px',
                mt: 1,
                mb: 3,
                transition: 'color 0.2s',
                '&:hover': { color: '#7ecfb3' },
              }}
            >
              <MailOutlineIcon sx={{ fontSize: 17 }} />
              acompanianteterapeuticoweb@gmail.com
            </Link>

            <Typography
              variant="overline"
              sx={{ color: '#7ecfb3', fontSize: '11px', letterSpacing: '0.1em' }}
            >
              Colaborar con la web
            </Typography>
            <Link
              href="https://link.mercadopago.com.ar/elcanaldelat"
              target="_blank"
              rel="noopener"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'rgba(184,221,212,0.8)',
                fontSize: '14px',
                mt: 1,
                transition: 'color 0.2s',
                '&:hover': { color: '#7ecfb3' },
              }}
            >
              <PaymentIcon sx={{ fontSize: 17 }} />
              Donar vía Mercado Pago
            </Link>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(184,221,212,0.4)', fontSize: '12px', mt: 1, lineHeight: 1.6 }}
            >
              Tu aporte ayuda a mantener este espacio gratuito para toda la comunidad.
            </Typography>
          </Grid>

          {/* Columna derecha — Formulario */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ color: '#7ecfb3', fontSize: '11px', letterSpacing: '0.1em' }}
            >
              Envianos tu consulta
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(184,221,212,0.55)', mb: 3, mt: 0.5, fontSize: '13px' }}
            >
              Consultas, sugerencias de centros o denuncias — respondemos a todos los mensajes.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  fullWidth
                  size="small"
                  value={formData.nombre}
                  onChange={handleChange('nombre')}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Requerido' : ''}
                  sx={inputSx}
                  FormHelperTextProps={{ sx: { color: '#f09595' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  helperText={errors.email ? 'Email inválido' : ''}
                  sx={inputSx}
                  FormHelperTextProps={{ sx: { color: '#f09595' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" sx={inputSx}>
                  <InputLabel>Tipo de consulta</InputLabel>
                  <Select
                    value={formData.tipo}
                    label="Tipo de consulta"
                    onChange={handleChange('tipo')}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#1a3530',
                          color: '#e8f5f0',
                          '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(126,207,179,0.1)' },
                        },
                      },
                    }}
                  >
                    {tiposConsulta.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mensaje"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange('mensaje')}
                  error={errors.mensaje}
                  helperText={errors.mensaje ? 'Por favor escribí tu mensaje' : ''}
                  sx={inputSx}
                  FormHelperTextProps={{ sx: { color: '#f09595' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  endIcon={<SendIcon sx={{ fontSize: 16 }} />}
                  onClick={handleSubmit}
                  sx={{
                    borderColor: 'rgba(126,207,179,0.4)',
                    color: '#7ecfb3',
                    borderRadius: 2,
                    py: 1.3,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '0.02em',
                    '&:hover': {
                      borderColor: '#7ecfb3',
                      backgroundColor: 'rgba(126,207,179,0.1)',
                    },
                  }}
                >
                  Enviar mensaje
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Divider sx={{ borderColor: 'rgba(126,207,179,0.1)', mt: 5, mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(184,221,212,0.35)', fontSize: '12px' }}>
            © {new Date().getFullYear()} El Canal del Acompañante Terapéutico — Hecho con
          </Typography>
          <FavoriteIcon sx={{ fontSize: 11, color: '#e24b4a', opacity: 0.6 }} />
          <Typography variant="caption" sx={{ color: 'rgba(184,221,212,0.35)', fontSize: '12px' }}>
            por la comunidad AT
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ backgroundColor: '#0f6e56', color: '#e1f5ee', '& .MuiAlert-icon': { color: '#7ecfb3' } }}
        >
          ¡Mensaje listo! Se abrirá tu cliente de correo.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;