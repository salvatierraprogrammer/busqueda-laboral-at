import { Card, CardContent, Typography, Button, Grid, Avatar, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Ícono de institución

function CardRecomendado({ datos }) {
    return (
        <Grid container spacing={2}>
            {datos.map((centro, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                            {/* Contenedor para el ícono y el nombre alineados horizontalmente */}
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', marginRight: 1 }}>
                                    <AccountBalanceIcon />
                                </Avatar>
                                <Typography variant="h5">{centro.nombre}</Typography>
                            </Box>
                            <Typography color="textSecondary">
                                Pago: {centro.pago}
                            </Typography>
                            <Typography color="textSecondary">
                                Parciales: {centro.parciales}
                            </Typography>
                            <Typography>
                                Pago a la espera: {centro.pago_espera ? 'Sí' : 'No'}
                            </Typography>
                            {centro.detalles && (
                                <Typography variant="body2">
                                    Detalles: {centro.detalles}
                                </Typography>
                            )}
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
            ))}
        </Grid>
    );
}

export default CardRecomendado;