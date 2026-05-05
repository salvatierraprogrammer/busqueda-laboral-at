import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface BannerItem {
  imageUrl?: string;
  email?: string;
  link?: string;
  title: string;
  description?: string;
}

interface BannerProps {
  banners?: BannerItem[];
}

// Datos de ejemplo por defecto — reemplazá con tus datos reales o pasalos como prop
const defaultBanners: BannerItem[] = [
  {
    title: 'Próximamente: Novedades de la comunidad AT',
    description: 'Este espacio es para destacar cursos, eventos y oportunidades laborales relevantes para Acompañantes Terapéuticos.',
  },
];

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const items = (banners && banners.length > 0) ? banners : defaultBanners;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length, paused]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const banner = items[current];

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (banner.email) {
      const subject = encodeURIComponent('Solicitud de información');
      const body = encodeURIComponent('Hola,\n\nMe comunico desde El Canal del AT para solicitar más información.');
      window.location.href = `mailto:${banner.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleCardClick = () => {
    if (banner.link) window.open(banner.link, '_blank');
  };

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ position: 'relative', width: '100%' }}
    >
      {/* Card principal */}
      <Box
        onClick={banner.link ? handleCardClick : undefined}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'stretch',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid rgba(15,110,86,0.15)',
          backgroundColor: '#fff',
          cursor: banner.link ? 'pointer' : 'default',
          minHeight: { xs: 'auto', sm: 160 },
          transition: 'box-shadow 0.25s ease',
          '&:hover': banner.link
            ? { boxShadow: '0 8px 28px rgba(15,110,86,0.12)' }
            : {},
        }}
      >
        {/* Franja de color izquierda */}
        <Box
          sx={{
            width: { xs: '100%', sm: 6 },
            height: { xs: 6, sm: 'auto' },
            backgroundColor: '#0f6e56',
            flexShrink: 0,
          }}
        />

        {/* Imagen (si existe) */}
        {banner.imageUrl && (
          <Box
            sx={{
              width: { xs: '100%', sm: 200 },
              height: { xs: 160, sm: 'auto' },
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}

        {/* Contenido */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#112420',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
              }}
            >
              {banner.title}
            </Typography>
            {banner.link && (
              <OpenInNewIcon sx={{ fontSize: 15, color: 'rgba(15,110,86,0.5)' }} />
            )}
          </Box>

          {banner.description && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(17,36,32,0.6)',
                fontSize: '13px',
                lineHeight: 1.65,
                whiteSpace: 'pre-line',
              }}
            >
              {banner.description}
            </Typography>
          )}

          {banner.email && (
            <Box sx={{ mt: 0.5 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<EmailOutlinedIcon sx={{ fontSize: '15px !important' }} />}
                onClick={handleEmailClick}
                sx={{
                  borderColor: 'rgba(15,110,86,0.35)',
                  color: '#0f6e56',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  py: 0.6,
                  '&:hover': {
                    borderColor: '#0f6e56',
                    backgroundColor: 'rgba(15,110,86,0.05)',
                  },
                }}
              >
                Más información
              </Button>
            </Box>
          )}
        </Box>

        {/* Indicador de posición */}
        {items.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              px: { xs: 0, sm: 2 },
              py: { xs: 1.5, sm: 0 },
            }}
          >
            {items.map((_, i) => (
              <Box
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                sx={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === current ? '#0f6e56' : 'rgba(15,110,86,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Flechas de navegación */}
      {items.length > 1 && (
        <>
          <IconButton
            onClick={(e) => { e.stopPropagation(); prev(); }}
            size="small"
            sx={{
              position: 'absolute',
              left: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              border: '1px solid rgba(15,110,86,0.2)',
              color: '#0f6e56',
              width: 32,
              height: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': { backgroundColor: '#f0faf6', borderColor: '#0f6e56' },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            onClick={(e) => { e.stopPropagation(); next(); }}
            size="small"
            sx={{
              position: 'absolute',
              right: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              border: '1px solid rgba(15,110,86,0.2)',
              color: '#0f6e56',
              width: 32,
              height: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              '&:hover': { backgroundColor: '#f0faf6', borderColor: '#0f6e56' },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default Banner;