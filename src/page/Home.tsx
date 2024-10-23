import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CardRecomendado from '@component/CardRecomendado';
import CardNoRecomendado from '@component/CardNoRecomendado';
// import Search from '@component/Search';
import { datos } from '../data/datos';
import imgHome from '../../public/imgHome.jpg';

function Home() {
    const { centros_recomendados, centros_no_recomendados } = datos[0]; // Accedemos a los datos.

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Función para manejar el cambio en la búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filtrar centros recomendados
    const filteredRecomendados = centros_recomendados.filter((centro) =>
        centro.nombre.toLowerCase().includes(searchTerm)
    );

    // Filtrar centros no recomendados
    const filteredNoRecomendados = centros_no_recomendados.filter((centro) =>
        centro.nombre.toLowerCase().includes(searchTerm)
    );

    return (
        <Container style={{ marginTop: 80, padding: '0 16px' }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: 20, textAlign: 'center' }}>
                Encuentra tu centro de acompañamiento terapéutico
            </Typography>
            
            {/* Aquí puedes incluir el componente de búsqueda */}
            {/* <Search onSearchChange={handleSearchChange} /> */}
            
            <Box sx={{ marginTop: 5}}>
            <Box 
            sx={{ 
                backgroundImage: `url(${imgHome})`, 
                borderRadius: 2, // Redondeo de bordes
                padding: 2, // Padding alrededor del texto
                backgroundSize: 'cover', // Ajusta la imagen para cubrir todo el área
                backgroundPosition: 'center', // Centra la imagen
                color: 'white', // Color del texto
                textAlign: 'center', // Alineación del texto
                // Añadir un filtro para mejorar la legibilidad del texto
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Filtro oscuro
                    borderRadius: '10px',
                },
                position: 'relative', // Posición relativa para el pseudo-elemento
            }}
        >
            <Typography variant="h5" gutterBottom style={{ position: 'relative', zIndex: 1 }}>
                Centros recomendados gracias a la comunidad de Acompañante Terapéutico.
                Estos centros son ideales para quienes están en la búsqueda laboral. 
                Recuerda que es importante tener un perfil agradable antes de enviar tu CV.
            </Typography>
        </Box>
                <Typography sx={{ marginTop: 5}} variant="h4" gutterBottom>
                    Centros Recomendados
                </Typography>
                <CardRecomendado datos={filteredRecomendados} />
            </Box>

            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h6" gutterBottom>
                    Centros No Recomendados
                </Typography>
                <CardNoRecomendado datos={filteredNoRecomendados} />
            </Box>
        </Container>
    );
}

export default Home;