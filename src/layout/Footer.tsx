import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#242424', 
        padding: '20px 0', 
        marginTop: '10px' // Cambiado a 10px
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" color="white">
          © {new Date().getFullYear()} Acompañante Terapéutico
        </Typography>
        <Typography variant="body2" align="center" color="white">
          Para consultas o contacto, por favor enviar un correo a{' '}
          <Link href="mailto:acompanianteterapeuticoweb@gmail.com" color="inherit">
            acompanianteterapeuticoweb@gmail.com
          </Link>
        </Typography>
        <Typography variant="body2" align="center" color="white" sx={{ marginTop: '10px' }}>
          Si deseas colaborar para el mantenimiento de la web, ponte en contacto con nosotros o realiza una donación a través de{' '}
          <Link href="https://link.mercadopago.com.ar/elcanaldelat" color="inherit" target="_blank" rel="noopener">
            Mercado Pago
          </Link>.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;