import { Box, Container, Typography, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // Ícono de correo
import PaymentIcon from '@mui/icons-material/Payment'; // Ícono de pago
import { Stack } from '@mui/material'; // Usamos Stack para mejorar el espaciado

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#242424', 
        padding: '20px 0', 
        marginTop: '10px', // Espaciado superior
        color: 'white', // Color de texto por defecto
        textAlign: 'center' // Centramos todo el texto
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Acompañante Terapéutico
        </Typography>
        
        <Stack spacing={2} sx={{ marginTop: '10px' }}>
          <Typography variant="body2">
            Para consultas, sugerencia o denuncias, por favor enviar un correo a{' '}
            <Link href="mailto:acompanianteterapeuticoweb@gmail.com" color="inherit" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MailOutlineIcon sx={{ marginRight: '5px' }} /> 
              acompanianteterapeuticoweb@gmail.com
            </Link>
          </Typography>

          <Typography variant="body2">
            Si deseas colaborar para el mantenimiento de la web, ponte en contacto con nosotros o realiza una donación a través de{' '}
            <Link href="https://link.mercadopago.com.ar/elcanaldelat" color="inherit" target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PaymentIcon sx={{ marginRight: '5px' }} />
              Mercado Pago
            </Link>.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;