import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, Button, Avatar, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Ícono de institución

function CardNoRecomendado({ datos }) {
    return (
        <Grid container spacing={2}>
            {datos.length === 0 ? (
                <Typography variant="h6" color="textSecondary" style={{ width: '100%', textAlign: 'center' }}>
                    No hay centros no recomendados.
                </Typography>
            ) : (
                datos.map((centro) => (
                    <Grid item xs={12} sm={6} md={4} key={centro.nombre}> {/* Usa nombre como clave única */}
                        <Card>
                            <CardContent>
                                {/* Contenedor para el ícono y el nombre alineados horizontalmente */}
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <Avatar sx={{ bgcolor: 'error.main', marginRight: 1 }}>
                                        <AccountBalanceIcon />
                                    </Avatar>
                                    <Typography variant="h5">{centro.nombre}</Typography>
                                </Box>
                                <Typography color="error">
                                    Motivo: {centro.motivo}
                                </Typography>
                                {centro.contacto && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`mailto:${centro.contacto}`}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Enviar Email
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
}

// Define PropTypes para el componente
CardNoRecomendado.propTypes = {
    datos: PropTypes.arrayOf(
        PropTypes.shape({
            nombre: PropTypes.string.isRequired,
            motivo: PropTypes.string.isRequired,
            contacto: PropTypes.string, // Campo para contacto
        })
    ).isRequired,
};

export default CardNoRecomendado;