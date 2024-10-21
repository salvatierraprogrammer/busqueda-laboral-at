import CardRecomendado from '../component/CardRecomendado';
import CardNoRecomendado from '../component/CardNoRecomendado';
import { datos } from '../data/datos';
import { Container, Typography } from '@mui/material';

function Home() {
    const { centros_recomendados, centros_no_recomendados } = datos[0]; // Accedemos a los datos.

    return (
        <Container style={{marginTop: 80, justifyContent: "center"} }>
            <Typography variant="h4" gutterBottom style={{marginTop: 20,}}>
                Centros Recomendados
            </Typography>
            <CardRecomendado datos={centros_recomendados} />
            <Typography variant="h4" gutterBottom style={{justifyContent: "center"}}>
                Centros No Recomendados
            </Typography>
            <CardNoRecomendado datos={centros_no_recomendados} />
        </Container>
    );
}

export default Home;