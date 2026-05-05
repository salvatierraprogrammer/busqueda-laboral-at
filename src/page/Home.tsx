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

// ⚠️ Ajustá estas rutas según tu estructura real
import CardRecomendado from '../component/CardRecomendado';
import CardNoRecomendado from '../component/CardNoRecomendado';
import Banner from '../component/Banner';

import { datos } from '../data/datos';
import imgHome from '../../public/imgHome.jpg'; // ⚠️ en Vite NO usar ../../public

// Banners simples
const bannersData = [
  {
    title: 'Próximamente: Novedades de la comunidad AT',
    description:
      'Este espacio es para destacar cursos, eventos y oportunidades laborales relevantes para Acompañantes Terapéuticos.\n¡Seguí sumando tu voz a la comunidad!',
  },
];

function Home() {
  const { centros_recomendados, centros_no_recomendados } = datos[0];
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Flyers (ARREGLADO: fuera del return)
  const flyers = [
    {
      imageUrl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADfCAMAAADcKv+WAAABKVBMVEX//sgAAAD//cr//sX//cv//9D//9L//9T//9j//9b//8z//8T+/Mz4+dT7/cVxcly5uZ54dWSMi3aChGoXFQ1dX09MTDX//+BWVVFfXlf//9z//8H//+RJTjWBgWzu7c1PSzbKyqutrJQqKCXp6MwrLCD//+nCwqajpJOMi37y78iXln+kpYfh37rk4rnc2bmZlomJhXJtak0GAw1CQDk3OiqGi20jIRtQUEHw7dXAvZcnJBNsa13GxKxwdmFlYlEJBwBZVknT0cDY1rFBQC4gGhXc3sUZGgo4NTeyr59ycW+wsZBISCg0NCI3NzClppk3NhTJx5xKR0bCwLCmqYfs67pRVU0/PjQoJxH///UhHwBfX0A/PSVzc1Dx8uWXmHE7Ow/Mxr5mZkPYmfgfAAAO80lEQVR4nO2dDV/bOLaH/SbJkmUnhIQUmcVNCIU6L6YtpYGhk4awYRmgpUuzMC0M997v/yHukR3aMCSQNpS4rP6/ljjymx5LPudIlhxNU1JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUkq/jK8Lxm2bTU3mxDkzuGaaBiKU2jZFOH1CxLa5BP1xRMswPauRm0mxXoQTFaNhaaaFX+qpVgZNgqhZmsbJ02lD3KZXeptOjGgD4vpMJp16resFe7KaChZHIq4tSIuTPokNQKST2VRT43RO13PImegwP0tkFhDxZMdQiNOWQhxLCnHaugdE0/SYQpyqFOI4UohT170gmo/dov4XOA2FOHUpxLGkEKcthTiWFOK0pRDHkkKcthTiWFKI05ZCHEsK8ascU7PiB0Se42gIc0gAjd4+3tjw4xPcXGtIjZO9B0V0DMtwIOeIuGFQqYQIG7CzNWp7bpimYXgYm8YoxHEYH7SiGpalOQYW2cIb+fB2r1mtY80cmU2JyLHYjIyRpZg2RMuSVY9Gr789oj5yb0GURYy2dP03bg4p6VQiygxxsgJk228rQVB6kdcLtjcs+1cHNjUCiE3s/SqImulopA6Eq8I3NZOJrP47ckw+LJ/SDJlglXBJ19u2xgZO1hdj6UTkoqXriwJsqQP2lZfqmm9yDQdRHVOs+T6WY5MsC1NhI2lteREQ54Mg0BAhlDlICIFNhxG30q241HKk9bpj2NDDIpooeqfrETP7lx8zsLJ2qQCJ+UzX9qxu1I1qQTj7emk9FyLDIBuv9VevdP11+Klcrl6iTnupWUNkJSPtVX6mgv3YKKUJkZZ1/RRMjNWvYVB1xWrf9OR3REd+vtvZjb//s44MfqjHiEfRMqTMd/fg7y7pXlmrpQr4k3QhajQDtuYbIlRXaX6WO9Td39OXXSzWdP1fT/RCbhsA5qhhCMCZfyYEfbav63/M60t5vYUq+npkFyvrup7B/K56+qCIcLVFW9dnhPcVEaBf6++6NqLPoHwPGJMF9OatoEIa3ohppCQHzfiOD1z6m/z+QqW5gcLDOmUcrJV+RO8ewPfQiE1AtM0rK2oYCBDef1hdXf1Q0PXfKQuA7K3gBnNhyxVuSotaEB4gbsKasrDA0ticI0rJwg64TCERb7erD2xRKRjUbeqYGG6g2KjS2sBYtUWBAHHZ5VzzxAwQIUdegpZtag6TpRhCFbcsrqEw+3x7/t+wLUXpQtQcnINCcz0TQjkIdQzHoZAwv18ul/fhT0BkdfxNIpr2ACJ14BwxvGfCzWeHGRn+rUtEG3mpQgSHBjnWV5DjWFzKcXAVCm8BM2wjhCDxBiLck9t2jPgOECFQ4HxhHthKXFbUZZE+RPdU3lvMdMxkPDM60PV/2J7vg993NONmKWYlooxj41LUABGSXoElcgggnqYOUeO2tJSLRYhQoLIim6AQXN0KkY1DxiwuEfcSxFaCCJdgW8iWRoxoSsTLuLKzIjjU3dSZGxMq5HNgbJdCbLsQiB+H8mbMv3WpWIhqIeYRfAtjxHaMiAGxLRiK78V8KBHJqgwPRFB+JxFZukoRZLHiYhzKrK8vwcclQq4ckLy+PQ+OvEHEvnQaRc48F0Kc3ALmH2Hbtf0qL57Amp0FzhiKfef8Gx3MzdKmYHed9eH7bnAxavWdxHZJQMjt5vLxt1YHNzLxUiE0uHsGC6dZOyzIlEzUjte0O0hjZEXusLe/JlNeWmly/X0xRINSuZwtBS7l4D+wCEoHtZWKjXijtvrhw4fVao8xIhdXV1zXXSln626lCuHBarnakM0qWsnWtkK7VCuvrh4Y6UN0HA8oCcXIYgZ8k9YSmlBE87S4xWTLNQZDdtG2CZMNf4KhdhIUT7hAMmbQLPgC1woTWxB21wkfHtFMdLUs/zjJB2QdGoBSspuHgWdxfN+PtzQ9ueh4DNoV8Vk8LzkKbHbXCadQUQ2tzygbjYZs0fYRZQLkmDGebDSwD2MehAuWD/G7KQMc09OSi+XJPbxbz5eGrmLPk12rST4xYtebDhY1OOFxH5bRv+2+c7B+OhCl00+qqIxxrOtdir5JuD9B9lKCiMUCiedwQb2DKGdwre+zIJhkPlAaEOEAYW5tNVZ5JaDe9TJDNT0f3WlURisNiHD39V7+9rXV2Oxc48Hu8mTTutKAyDXHszchnluafyJ7ofSTQSBLNqM//eKlKB0EFxnZcKS8cyp7ZCyDQ3W1LGlfWVjbImP3fd9UWhAtG6LzHDUtLntv6kyD8IcSwmVLkoMneQyIFBCrxLM8Ci2PErQ0TtZerL4NmMOoEG6PPRpEjXsYWlEl1FhOuo9XxCd9aend3OMpRZOzEMhCaC2eZrur7/WqaJSXZBYfCyLVsLwnC7QEDWPPp4F+gHzZQ779WBBnut0stIDzXdlRV4XmE93qaabsoZp5JIiv+k+OPzLZhfNuO9stCghXJeLiY0HMLy83Z05czcci6eFY2hfGo0LU154tEEox556GZveSZwD08SBKM1O1se97FrUd8Pzhx41T+XTq0SAaMSJzPC/uDghnA+Sghee6XmaPAtGEhjD7XR6h34xiFf3E9j13R9ezPi5DS4M5jsl/LJ9pQDRNx8PF/4D3K/bLiUX6epfSzW09X4+flBds5H13j0Zf6UBkdPMEXMY/T4Kk0cTlk4/38lasUbH5RNff7BSx5vzY8VOBqMVRW6ykoLhbbuchBmiXKMolK+aI5v+6iJZhoKCvPiIn1A2DoEiZF8bpmz/efZMGRG6Znsdkpyrvc3DN9GWnOTc8D9ykYXAKjWNr9FCy25QGxJ8shTiWFOK0pRDHkkIcU8atmuDACnEsKcQxpRB/XGlBZIiOkHxbHZ7gwVQqELnheGHryS1qBxNkLx2Ipha25keoAHrZmCB7aUC0DNPgdnGEhBD0l6+ociy8xZ0RsjRzsqgpDYiJxTRHyDLlpMAJsvewk/tGpccTxjDHmA8Kx/8s2ZE8ZHLftwNeDUUaMd7vZyMO+jZLju5yzBtrk9FvN/3fYMqNZTmFVc6HNGUnbFzcju8PnXfzMIjJBTZlj6k/MMqvv9aRebzaZATijQujxWBx/e5fNdMfPm33YRATrGQEWGJEzOuIMmUAfQji3y+MluykDew0YmbyA1XUZLurQZl/K8VRmRsVul3VjP4oz3h6q5VMcR12Pz4Eohy6zxlC8ShTxGRu2NVaBv8QkiM2LcTQdbMST8JMtoRtOLoaehqP3oAUlszkvDokQ8OnMv50i2pw2mgQSupRnSMURlEn5Ag35JDTBtKshmU1oii05RyaTigfCmsG4o0eZIk1ODNQA/LNeo0opGHU6RHwHpZM53A8Qiw5i7PeaXDE4aPTY9NANDUxs9zcbbjv5gvnIam92Z7vaLgjR9aE+gkLj7m9/GR+OUtR+aywXJYljUtH7eVLzXP1DeLZ7+vI46X3yx/t6tL27oztsY6eZV7war59FCEwoqHeap7VaUffbm+xYRMafjYiwwetomhwfPTnn5kDWlv98xnyxGLmJWXh0W+94JyT15WF6DhsfA5E5XODwR7HK8Ww4aDsy0PuoLmG5nuiXBV4o7Ygnn5kdDbzhfnh0UIx+1S+8Dw8L4rsF9Fp//mMyMlYD47I7Zcrtvw8+7B/1CG1/PqF57mnfx0FOGjuH26ec3beQPZctDVDPZLJAmLjvKghS7NbO9sriDytM9/HtSphl5+IXbsk7u5fuw24PoS7nwNssd4xQ8H/hJHePOw500C06GxNcMb42fPTqiC1538FBlrR/8gf4PB84eJFk6PzBhXn9VLTZqJZAsTeccAJ1gL9j39tF4vNLvE0XMtRdFmjYvYTLsHONbG57OLgzOWGFh4TUjkkpfZmgLxhod5Pvxd5tFeONnr87K/uZxfXnm92XfJlv7t/iBvHtnt0hMnR2+6LLzY/r0a5cyLvxYtClD2gly+6O0dhsfm/3QZ3qzPUruYq2b2A/l+5e3JOg6WdqJUj4DXCo240d2mXTjcroWcOcTI/39zQKNM64PyiYl9u2SuFdrMeXghSvOj1LhCvZzhZbLdzLpRarpALpL3Abq29WEcbFWR/+ohz7XbGLrVbW3YWliI7vLARveiFmXYbqoc0N6126wAsNhz5AE3D9WuJBzMM+B//fAchzMLgpsHLIXCT8SR+iqUvwAQjCxA5tgXRTPm0Dbwh7ECw3CTeF7yj3BY8IqIEDinfQkJsG1YiGs9TcW5CPmQYDoG4DAOSSKQfmEtBa8K6Hn8DqoxaTRm4yOHwck+5MLgRS+Z7wHUgXEb4hmyUaEOipIdE7E9Budm9Zn1bm4RzccguJxt9DfgGlZzUiYNeOJzFjf7Mm/70nekjDqRf7f/tB3ZkOxFaSLJIjJjYGoXo95sa8Zd++tBQ90ERB/IzCJ2UBVRJWWMthG0b3KmgWMa0/Noj/oFrJJtOcSjzLWXES5AewNz8TYPpXzMOXzm6/IjQ1qWdabUMOltoVbHB8Mossqx+Vb7uD8z4uvQXvl6vITlIQ99NIgNvzbl2e8uuHJW42D3pLn6BUK+515B9kL9M382tcgxyXA8+Q1y2G3B6WBH0rIei9tolse6aLXy70oPom2Sjur/BNBfCUnxYx7hZp9W1nWPb+tGhYYnSg+iYrHO+23A8sVthshQbeyE9ajb3OvyxIAIFmWsSk1X1Ge6eb8+clelW4VmxnJkwe+lBhAAHNeoIyrIUcRLtRIGNeg2K3c6ITtRxlR7EQcn+HsYm+SW6AaUVcXjf2w9JIY4lhfgDUojfp3Qi3qsU4lhSiNOWQhxLCnHaUohjSSFOWwpxLCnEaUshjiWFOG0pxHEkRzDRf6QckUx0CE8hTlsKcRwpxKnrHhDNK6fB/Dvmdk1H94mI5FCZ9IneH+JzQQhLoRZeyHeSTY74VNe3s+nUyfz9lOLTq/d/pVMFOsnEsgSxMG2I29Wikz4EMtDH92/yKdXeXv51aZI3AfeF3PSqWBST1dNEXnrFkByROzmiZLyHo/wMxe9PH/qra98pK7WKhzha94A4ahLp9MW56Yz+BcTvQdSS4c5SX3mTtOFr/rZycM2wPYeuGeuE9zZoQElJSUlJSUlJSUlJSUlJSUlJSUlJSemX1v8D6ZLztmHFdI0AAAAASUVORK5CYII=',
      link: 'https://www.centrapsi.com/',
      email: 'cvs@miradahumana.com.ar',
      title: 'Centra Psi',
      description:
        'Centra Psi diseña equipos de acompañantes terapéuticos según cada paciente. Supervisión y seguimiento continuo.',
    },
    {
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9rkcGADtx4Qf0Q_c7Cwq5xYWCGx03-Iq5g&s',
      email: 'cvs@miradahumana.com.ar',
      link: 'https://miradahumana.com.ar/',
      title: 'Mirada Humana',
      description: `Buscamos Acompañantes Terapéuticos 🙌`,
    },
    {
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFElJpKOQWqkrFUFuMPlFGGKHI2OfmAIHMQ&s',
      email: 'cvs@miradahumana.com.ar',
      link: 'https://desirsalud.com.ar/busqueda-laboral/',
      title: 'Decir Salud',
      description:
        'Conecta con pacientes en busca de apoyo emocional. Oportunidades para terapeutas.',
    },
  ];

  // Filtros
  const filteredRecomendados = centros_recomendados.filter((centro) =>
    centro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNoRecomendados = centros_no_recomendados.filter((centro) =>
    centro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#f7faf9', minHeight: '100vh' }}>
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 10, sm: 12 }, pb: 8, px: { xs: 2, sm: 3 } }}
      >
        {/* HERO */}
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

          <Box sx={{ position: 'relative', p: 4 }}>
            <Chip
              label="Actualizado por la comunidad"
              sx={{ mb: 2, background: '#7ecfb3', color: '#00332b' }}
            />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
              Encontrá tu próximo centro de trabajo
            </Typography>
            <Typography sx={{ color: '#d9f3ec' }}>
              Información real de Acompañantes Terapéuticos.
            </Typography>
          </Box>
        </Box>

        {/* BUSCADOR */}
        <Box sx={{ mb: 5, maxWidth: 500 }}>
          <TextField
            fullWidth
            placeholder="Buscar centro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* BANNER */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Novedades
          </Typography>

          {/* podés usar flyers o bannersData */}
          <Banner banners={flyers} />
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* RECOMENDADOS */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          <VerifiedIcon /> Centros Recomendados
        </Typography>

        <CardRecomendado datos={filteredRecomendados} />

        <Divider sx={{ my: 6 }} />

        {/* NO RECOMENDADOS */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          <WarningAmberIcon /> Centros No Recomendados
        </Typography>

        <CardNoRecomendado datos={filteredNoRecomendados} />
      </Container>
    </Box>
  );
}

export default Home;