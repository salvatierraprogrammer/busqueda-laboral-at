import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  InputAdornment,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CardRecomendado from '@component/CardRecomendado';
import CardNoRecomendado from '@component/CardNoRecomendado';
import Banner from '@component/Banner';
import { datos } from '../data/datos';
import imgHome from '../../public/imgHome.jpg';

// Definí tus banners acá, o traelos desde Firestore
const bannersData = [
  {
    title: 'Próximamente: Novedades de la comunidad AT',
    description:
      'Este espacio es para destacar cursos, eventos y oportunidades laborales relevantes para Acompañantes Terapéuticos.\n¡Seguí sumando tu voz a la comunidad!',
  },
  // Podés agregar más:
  // { title: 'Nuevo centro verificado', description: '...', email: '...', link: '...' },
];

function Home() {
  const { centros_recomendados, centros_no_recomendados } = datos[0];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecomendados = centros_recomendados.filter((centro) =>
    centro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredNoRecomendados = centros_no_recomendados.filter((centro) =>
    centro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#f7faf9', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 8, px: { xs: 2, sm: 3 } }}>

        {/* Hero */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            mb: 6,
            minHeight: { xs: 220, sm: 280 },
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${imgHome})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.45)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(10,40,32,0.92) 0%, rgba(10,40,32,0.3) 60%, transparent 100%)',
            }}
          />
          <Box sx={{ position: 'relative', p: { xs: 3, sm: 5 }, maxWidth: 700 }}>
            <Chip
              label="Actualizado por la comunidad"
              size="small"
              sx={{
                backgroundColor: 'rgba(126,207,179,0.2)',
                color: '#7ecfb3',
                border: '0.5px solid rgba(126,207,179,0.4)',
                mb: 2,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: '#fff',
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                mb: 1.5,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Encontrá tu próximo centro de trabajo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(232,245,240,0.75)',
                lineHeight: 1.7,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Información real de Acompañantes Terapéuticos sobre condiciones de pago, trato y
              organización de cada centro. Antes de enviar tu CV, revisá esta guía.
            </Typography>
          </Box>
        </Box>

        {/* Buscador */}
        <Box sx={{ mb: 5, maxWidth: 500 }}>
          <TextField
            fullWidth
            placeholder="Buscar centro por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#0f6e56', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: '#fff',
                '& fieldset': { borderColor: 'rgba(15,110,86,0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(15,110,86,0.4)' },
                '&.Mui-focused fieldset': { borderColor: '#0f6e56' },
              },
              '& .MuiInputBase-input': { fontSize: '14px' },
            }}
          />
        </Box>

        {/* Destacados / Banner — ✅ se pasa banners como prop */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#0f6e56', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Destacados
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#112420', mt: 0.5, mb: 3, letterSpacing: '-0.02em' }}
          >
            Novedades de la comunidad
          </Typography>
          <Banner banners={bannersData} />
        </Box>

        <Divider sx={{ borderColor: 'rgba(15,110,86,0.1)', mb: 6 }} />

        {/* Centros Recomendados */}
        <Box sx={{ mb: 7 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <VerifiedIcon sx={{ color: '#0f6e56', fontSize: 22 }} />
            <Typography
              variant="overline"
              sx={{ color: '#0f6e56', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              Verificados por la comunidad
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#112420', letterSpacing: '-0.02em' }}>
              Centros Recomendados
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(15,110,86,0.6)', fontSize: '13px' }}>
              {filteredRecomendados.length} centros encontrados
            </Typography>
          </Box>
          <CardRecomendado datos={filteredRecomendados} />
        </Box>

        <Divider sx={{ borderColor: 'rgba(211,47,47,0.1)', mb: 6 }} />

        {/* Centros No Recomendados */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <WarningAmberIcon sx={{ color: '#b71c1c', fontSize: 22 }} />
            <Typography
              variant="overline"
              sx={{ color: '#b71c1c', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              Reportados por la comunidad
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#112420', letterSpacing: '-0.02em' }}>
              Centros No Recomendados
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(183,28,28,0.5)', fontSize: '13px' }}>
              {filteredNoRecomendados.length} centros encontrados
            </Typography>
          </Box>
          <CardNoRecomendado datos={filteredNoRecomendados} />
        </Box>

      </Container>
    </Box>
  );
}

export default Home;