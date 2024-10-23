import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import CardRecomendado from '@component/CardRecomendado';
import CardNoRecomendado from '@component/CardNoRecomendado';
// import Search from '@component/Search';
import { datos } from '../data/datos';

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
        <Container style={{ marginTop: 80, justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: 20 }}>
                {/* Pasar la función de búsqueda como prop */}
                {/* <Search onSearchChange={handleSearchChange} /> */}
            </Typography>
            
            {/* Mostrar centros recomendados filtrados */}
            <Typography variant="h4" gutterBottom style={{ marginTop: 20 }}>
                Centros Recomendados
            </Typography>
            <CardRecomendado datos={filteredRecomendados} />

            {/* Mostrar centros no recomendados filtrados */}
            <Typography variant="h4" gutterBottom style={{ justifyContent: "center" }}>
                Centros No Recomendados
            </Typography>
            <CardNoRecomendado datos={filteredNoRecomendados} />
        </Container>
    );
}

export default Home;