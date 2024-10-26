import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

interface BannerProps {
  banners: {
    imageUrl: string;
    email: string; 
    link: string;  // Asegúrate de que el 'link' esté presente en los datos
    title: string;
    description?: string;
  }[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <Carousel 
      showArrows={true} 
      infiniteLoop={true} 
      autoPlay={true} 
      interval={3000} 
      stopOnHover={true}
      swipeable={true}
      showThumbs={false}
      emulateTouch={true}
      useKeyboardArrows={true}
    >
      {banners.map((banner, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: 2,
            cursor: 'pointer',
            overflow: 'hidden',
            padding: { xs: 1, sm: 2 },
            margin: { xs: 1, sm: 2 },
            backgroundColor: '#242424',
            width: '100%',
          }}
          onClick={() => {
            // Redirige al usuario al enlace en una nueva pestaña si está disponible
            if (banner.link) {
              window.open(banner.link, '_blank'); // Abre el enlace en una nueva pestaña
            }
          }}
        >
          <Box 
            sx={{ 
              flexShrink: 0, 
              marginBottom: { xs: 1, sm: 0 }, 
              width: '100%', 
              maxWidth: '500px',
              height: '500px',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              style={{
                width: '100%', // Asegúrate de que ocupe todo el ancho del contenedor
                height: 'auto', // Ajusta automáticamente la altura para mantener la relación de aspecto
                maxHeight: '500px', // Establece una altura máxima para mantener el diseño
                objectFit: 'cover', // Asegúrate de que cubra el área sin distorsión
                borderRadius: '8px',
              }}
            />
          </Box>
          <Box 
            sx={{ 
              color: '#fff', 
              textAlign: { xs: 'center', sm: 'left' }, 
              flex: 1, 
              padding: { xs: 1, sm: 2 } 
            }}
          >
            <Typography variant="h6" color='#fff' sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
              {banner.title}
            </Typography>
            {banner.description && (
              <Typography 
                variant="body2" 
                color='#fff' 
                sx={{ 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  whiteSpace: 'pre-line'
                }}
              >
                {banner.description}
              </Typography>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el clic se propague al contenedor del banner
                if (banner.email) {
                  const subject = encodeURIComponent("Solicitud de CV");
                  const body = encodeURIComponent(`Hola,\n\nDeseo enviar mi CV para el puesto.`);
                  window.location.href = `mailto:${banner.email}?subject=${subject}&body=${body}`;
                } else {
                  alert('No se proporcionó una dirección de correo electrónico.');
                }
              }}
            >
             Mas Informacion
            </Button>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default Banner;