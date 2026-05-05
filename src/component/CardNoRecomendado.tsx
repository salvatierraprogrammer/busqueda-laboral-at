import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function CardNoRecomendado({ datos }) {
  if (datos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          backgroundColor: 'rgba(183,28,28,0.03)',
          borderRadius: 3,
          border: '1px dashed rgba(183,28,28,0.15)',
        }}
      >
        <Typography variant="body1" color="text.secondary">No hay centros reportados.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {datos.map((centro) => (
        <Grid item xs={12} sm={6} md={4} key={centro.nombre}>
          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid rgba(183,28,28,0.1)',
              boxShadow: 'none',
              backgroundColor: '#fff',
              position: 'relative',
              overflow: 'visible',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(183,28,28,0.1)' },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '3px',
                backgroundColor: '#c62828',
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
                    sx={{ fontWeight: 700, color: '#1a0a0a', letterSpacing: '-0.01em', lineHeight: 1.3, fontSize: '1rem' }}
                  >
                    {centro.nombre}
                  </Typography>
                  <Chip
                    label="No recomendado"
                    size="small"
                    sx={{
                      mt: 0.75, height: 20,
                      backgroundColor: 'rgba(198,40,40,0.08)',
                      color: '#c62828',
                      border: '0.5px solid rgba(198,40,40,0.2)',
                      fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em',
                    }}
                  />
                </Box>
                <ReportProblemOutlinedIcon sx={{ color: 'rgba(198,40,40,0.5)', fontSize: 20, mt: 0.3, ml: 1, flexShrink: 0 }} />
              </Box>

              <Divider sx={{ mb: 2, borderColor: 'rgba(198,40,40,0.08)' }} />

              {/* Motivo */}
              <Box
                sx={{
                  backgroundColor: 'rgba(198,40,40,0.04)',
                  borderRadius: 2, p: 1.5,
                  mb: (centro.contacto || centro.web) ? 2.5 : 0,
                  borderLeft: '2px solid rgba(198,40,40,0.3)',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: '#c62828', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 0.5 }}
                >
                  Motivo reportado
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(26,10,10,0.7)', fontSize: '13px', lineHeight: 1.6 }}>
                  {centro.motivo}
                </Typography>
              </Box>

              {/* Botones */}
              {(centro.contacto || centro.web) && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {centro.contacto && (
                    <Button
                      variant="outlined" size="small"
                      startIcon={<EmailOutlinedIcon sx={{ fontSize: '14px !important' }} />}
                      href={`mailto:${centro.contacto}`}
                      sx={{
                        flex: 1, minWidth: 0,
                        borderColor: 'rgba(198,40,40,0.25)', color: '#c62828',
                        borderRadius: 2, py: 0.8, textTransform: 'none', fontSize: '12px', fontWeight: 600,
                        '&:hover': { borderColor: '#c62828', backgroundColor: 'rgba(198,40,40,0.05)' },
                      }}
                    >
                      Email
                    </Button>
                  )}
                  {centro.web && (
                    <Button
                      variant="outlined" size="small"
                      startIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
                      href={centro.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        flex: 1, minWidth: 0,
                        borderColor: 'rgba(100,100,100,0.2)', color: 'rgba(26,10,10,0.5)',
                        borderRadius: 2, py: 0.8, textTransform: 'none', fontSize: '12px', fontWeight: 600,
                        '&:hover': { borderColor: 'rgba(100,100,100,0.4)', backgroundColor: 'rgba(0,0,0,0.03)', color: '#1a0a0a' },
                      }}
                    >
                      Web
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

CardNoRecomendado.propTypes = {
  datos: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      motivo: PropTypes.string.isRequired,
      contacto: PropTypes.string,
      web: PropTypes.string,
    })
  ).isRequired,
};

export default CardNoRecomendado;