// src/component/Home.tsx
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CardRecomendado from '@component/CardRecomendado';
import CardNoRecomendado from '@component/CardNoRecomendado';
import Banner from '@component/Banner'; // Importando el componente Banner
import { datos } from '../data/datos';
import imgHome from '../../public/imgHome.jpg';
import flyer from '../../public/flyer.jpg'; // Asegúrate de importar tus flyers correctamente
import congreso from '../../public/congreso.png';
function Home() {
    const { centros_recomendados, centros_no_recomendados } = datos[0];

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar centros recomendados
    const filteredRecomendados = centros_recomendados.filter((centro) =>
        centro.nombre.toLowerCase().includes(searchTerm)
    );

    // Filtrar centros no recomendados
    const filteredNoRecomendados = centros_no_recomendados.filter((centro) =>
        centro.nombre.toLowerCase().includes(searchTerm)
    );

    // Datos de los flyers
    const flyers = [
        
        
        {
            imageUrl: 'https://scontent.ffdo24-3.fna.fbcdn.net/v/t39.30808-6/330485135_3503540719868003_3452934922243546914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH0_SD33XjJTp1shHlNRwH01x4jNl1nBNTXHiM2XWcE1AjyPC6afuvIBNybIuVplYDlNcNHWXCLOuzzvpUz7usQ&_nc_ohc=XDcLU6PD5dQQ7kNvgHs8DNA&_nc_ht=scontent.ffdo24-3.fna&_nc_gid=Awd1I_NHuvGrmrUWEfpn-BQ&oh=00_AYCTqM34BKR4Hvt8AMzTz5BIniitDCfoXULXaiLHhEquUw&oe=671F7D99',
             link: "https://www.centrapsi.com/",
            email: 'cvs@miradahumana.com.ar',
             title: "Centra Psi",
            description: "Centra Psi diseña equipos de acompañantes terapéuticos de acuerdo a las características del paciente. Nos encargamos de la coordinación y el seguimiento del caso, como así también de la supervisión de los acompañantes. Trabajamos con prepagas, obras sociales o en forma particular."
         },
         {
           imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/456826200_2266234960385354_162341962218145390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEGNS9JIiWB5ZW4g-NHVjCwxuC5PdLBnKfG4Lk90sGcp-JqNeM4lkexhMG-P4y4su2BK3PPwhLSy25iKSo6OIoG&_nc_ohc=4ss_p9TYi7YQ7kNvgHGUfg4&_nc_ht=scontent.faep24-1.fna&_nc_gid=A_u0_xEJM9ccICl-syBqonp&oh=00_AYD02vv4hgxjexxlpmc8OG7X_CEjV-lQsMGTTsE89ujysA&oe=671F8E47',
          email: 'cvs@miradahumana.com.ar',
          link: "https://miradahumana.com.ar/",
          title: "Mirada Humana",
         description: `Si sos Acompañante Terapéutico, profesional y/o relacionado a la salud mental, 
          podés sumarte a nuestro equipo! 🙌👉 
      
           Requisitos: 
         ✔️ Monotributo al día o posibilidad de tramitarlo.
           ✔️ Seguros de Responsabilidad Civil y de Accidentes Personales.
           ✔️ Reuniones de supervisión mensuales (actualmente modalidad virtual).
      
           Interesados o para más información, enviar CV o consulta a: 
          cvs@miradahumana.com.ar
      
          Muchas gracias,
           Equipo Mirada Humana- AT`
         },
         {
             "imageUrl": "https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/439319511_2099353760449901_2845244578568097042_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH0xsBHVfKmnxrCKeuloZkg1fSrFyeGdXzV9KsXJ4Z1fDWNDleveuaLQ_suupsI0HgXMBmUp-ysLLmAbx0Y6tJx&_nc_ohc=0bVDcqmi2OAQ7kNvgFQEHC-&_nc_ht=scontent.faep24-2.fna&_nc_gid=AMn7s66Y4QfK4jNPy8fNr8g&oh=00_AYAAzQcGcjdIxany-y98Z6wg8B6hnxUnkNQHA1rzJhtORg&oe=671FA031",
             "email": "cvs@miradahumana.com.ar",
             "link": "https://desirsalud.com.ar/busqueda-laboral/",
             "title": "Decir Salud",
             "description": "Conecta con pacientes en busca de apoyo emocional. Ofrecemos oportunidades para terapeutas apasionados."
         }
       
      
    ];

    return (
        <Container style={{ marginTop: 80, padding: '0 16px' }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: 30, textAlign: 'center' }}>
                {/* Encuentra tu centro de acompañamiento terapéutico */}
            </Typography>

            <Box
                sx={{
                    backgroundImage: `url(${imgHome})`,
                    borderRadius: 2,
                    padding: 2,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '10px',
                    },
                    position: 'relative',
                }}
            >
                <Typography variant="h5" gutterBottom style={{ position: 'relative', zIndex: 1 }}>
                    Centros recomendados gracias a la comunidad de Acompañante Terapéutico.
                    Estos centros son ideales para quienes están en la búsqueda laboral. 
                    Recuerda que es importante tener un perfil agradable antes de enviar tu CV.
                </Typography>
            </Box>
             {/* Mostrar Banners en el carrusel */}
             <Typography variant="h4" gutterBottom style={{ marginTop: 20, textAlign: 'center' }}>
                Destacados
            </Typography>
            <Banner banners={flyers} />


            <Box sx={{ marginTop: 5 }}>
                <Typography sx={{ marginTop: 5 }} variant="h4" gutterBottom>
                    Centros Recomendados
                </Typography>
                <CardRecomendado datos={filteredRecomendados} />
            </Box>

            <Box sx={{ marginTop: 5 }}>
                <Typography variant="h6" gutterBottom>
                    Centros recomendados
                </Typography>
                <CardNoRecomendado datos={filteredNoRecomendados} />
            </Box>
        </Container>
    );
}

export default Home;
