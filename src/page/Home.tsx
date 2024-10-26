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
            "imageUrl": congreso,
            "email": "",
            "link": "https://congresoat2024.wixsite.com/congreso-internacion",
            "title": "Jueves 7 de Noviembre",
            "description": "CENTRO CULTURAL PASAJE DARDO ROCHA (Calle 7 y 50)\n\n10 hs Acreditaciones\n12 hs APERTURA Del el 3er Congreso Nacional, 2do. Internacional, 1er Congreso Provincial y 1er Congreso Platense de Acompañamiento Terapéutico 'Confluencias teóricas y razonamientos prácticos del acompañamiento terapéutico'\n12:15 hs Palabras de bienvenida Dr. Nicolás Kreplak (Ministro de Salud de la Pcia Buenos Aires)\n12:25 hs Palabras de bienvenida Dr. Julio Alak (Intendente de La Plata)\n12:35 hs Lic. A.T. ESTAR\n12:45 hs Lic. A.T. Vladimiro Chiattone ATALyC\n12:55 - 13:05 hs Presentación de las instituciones adherentes\n13:05 - 13:45 hs Break\n13:45 - 14:00 hs Presentación libro Dr. Eduardo Cossi: 'Manual Integral del acompañamiento terapéutico'\n14:10 - 14:30 hs Presentación libro Noelia Alfano Mariela Presedo\n14:35 - 15:15 hs Presentación libro Vladimiro Chiattone: 'El concepto del cuerpo en el AT'\n15:20 - 15:50 hs Leonardo Gonzalez - Ana Szklanny\n15:55 - 16:25 hs Jorge Rios y Bianca Rossi - 'Hacia una escuela para todos: Desafíos y oportunidades de la inclusión'"
        },
        {
            "imageUrl": congreso,
            "email": "",
            "link": "https://congresoat2024.wixsite.com/congreso-internacion",
            "title": "Viernes 8 de Noviembre",
            "description": "Edificio KARAKACHOFF (Calle 7 y 48)\n\n8:45 hs Acreditaciones\n9:30 - 11:00 hs Mesa 1 Eje socio comunitario\nTUAT Sabrina Bocca - TUAT Fabio Diaz: 'Creando puentes: la adherencia familiar en talleres socioeducativos coordinados por el AT'\nSusana Figaro: 'Rol del AT en la Autogestión Cooperativista'\nAlicia Mendoza - Naranjo Ines: 'presentación de proyecto de Alumnos “observación y construcción de proyecto”'\n11:05 - 11:15 hs Cristina Rodriguez (Costa Rica)\n\n11:15 - 13:15 hs Mesa 2 Eje salud\nLic. Leonardo Gonzalez - Lic. Ana Laura Szklanny: 'Sexualidad en la discapacidad: derrumbando tabúes a través del acompañamiento terapéutico'\nLic. Carina Fratantueno\nDr. Eduardo Cossi: 'Conversaciones sobre acompañamiento terapéutico'\nNicolas Andorno: 'Resistencias Familiares al dispositivo del AT'\nLic. Patricia Yañez: 'El Acompañante Terapéutico, profesional idóneo para un modelo de Maternidad Segura y centrada en la Familia'\n13:15 - 14:00 hs Break\n14:05 - 14:35 hs PS Emma Gonzalez (México)\n14:40 - 15:40 hs Mesa 3 Eje jurídico\nLic. Leticia Márquez: 'El AT en el ámbito Judicial'\nTSAT Angelica Robbio - TSAT Nora Baima - TSAT Veronica Valenzuela - TSAT Mayra Aguilar: 'Proyectos de inserción del AT judicial'\nCierre 16:00 hs"
        },
        {
            "imageUrl": congreso,
            "email": "",
            "link": "https://congresoat2024.wixsite.com/congreso-internacion",
            "title": "Talleres. Viernes 8 de Noviembre",
            "description": "Instituto Superior de Formación Técnica Triskel. Calle 1 nro 671 entre 45 y 46\n\n16:30 - 18:30 hs\nBetina Ballestra Aula 1: 'Taller de recreación y escritura creativa'\nNoe Alfano - Mariela Presedo Aula 2: 'Escenas cotidianas del AT escolar: desafíos de la práctica'\nSoledad Oliva Aula 3: 'Emoción AT e'\n\n21:00 hs Cena Camaradería (Lugar a convenir)"
        },
        {
            "imageUrl": congreso,
            "email": "",
            "link": "https://congresoat2024.wixsite.com/congreso-internacion",
            "title": "Sábado 9 de Noviembre",
            "description": "CENTRO CULTURAL PASAJE DARDO ROCHA (Calle 7 y 50)\n\n09:00 - 09:45 hs\nDiego Nuñez: 'El Buen Trato al Estrés. Cultivando el bienestar integral'\nJuan Kapovic: 'Conectando Vidas: Reconocimiento de Señales de Alerta para la Prevención de Lesiones Autolíticas y Suicidio en el Entorno Digital'\n\n09:55 - 10:15 hs Mesa 2 Eje jurídico\nMartinez, Gisela Beatriz - Zimbile, Andrea Viviana: 'El AT en el ámbito Judicial'\nDra. Silvana Paz: 'Prácticas restaurativas'\nLic. Patricia Piñones (México): 'Proyecto Mujeres en espiral'\nMarcelo Damonte SPB: 'Acompañamiento terapéutico en instituciones cerradas'\nDr. Antonio Quiroz (México): 'El Centro de Acompañamiento terapéutico en México'\n\n13:30 hs Break\n\n14:30 - 16:00 hs Mariel Roberts: 'Taller: Set y setting en el acompañamiento terapéutico'\n\n16:00 hs Premiación y Cierre"
        }
        // {
        //     imageUrl: 'https://scontent.ffdo24-3.fna.fbcdn.net/v/t39.30808-6/330485135_3503540719868003_3452934922243546914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH0_SD33XjJTp1shHlNRwH01x4jNl1nBNTXHiM2XWcE1AjyPC6afuvIBNybIuVplYDlNcNHWXCLOuzzvpUz7usQ&_nc_ohc=XDcLU6PD5dQQ7kNvgHs8DNA&_nc_ht=scontent.ffdo24-3.fna&_nc_gid=Awd1I_NHuvGrmrUWEfpn-BQ&oh=00_AYCTqM34BKR4Hvt8AMzTz5BIniitDCfoXULXaiLHhEquUw&oe=671F7D99',
        //     link: "https://www.centrapsi.com/",
        //     email: 'cvs@miradahumana.com.ar',
        //     title: "Centra Psi",
        //     description: "Centra Psi diseña equipos de acompañantes terapéuticos de acuerdo a las características del paciente. Nos encargamos de la coordinación y el seguimiento del caso, como así también de la supervisión de los acompañantes. Trabajamos con prepagas, obras sociales o en forma particular."
        // },
        // {
        //   imageUrl: 'https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/456826200_2266234960385354_162341962218145390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEGNS9JIiWB5ZW4g-NHVjCwxuC5PdLBnKfG4Lk90sGcp-JqNeM4lkexhMG-P4y4su2BK3PPwhLSy25iKSo6OIoG&_nc_ohc=4ss_p9TYi7YQ7kNvgHGUfg4&_nc_ht=scontent.faep24-1.fna&_nc_gid=A_u0_xEJM9ccICl-syBqonp&oh=00_AYD02vv4hgxjexxlpmc8OG7X_CEjV-lQsMGTTsE89ujysA&oe=671F8E47',
        //   email: 'cvs@miradahumana.com.ar',
        //   link: "https://miradahumana.com.ar/",
        //   title: "Mirada Humana",
        //   description: `Si sos Acompañante Terapéutico, profesional y/o relacionado a la salud mental, 
        //   podés sumarte a nuestro equipo! 🙌👉 
      
        //   Requisitos: 
        //   ✔️ Monotributo al día o posibilidad de tramitarlo.
        //   ✔️ Seguros de Responsabilidad Civil y de Accidentes Personales.
        //   ✔️ Reuniones de supervisión mensuales (actualmente modalidad virtual).
      
        //   Interesados o para más información, enviar CV o consulta a: 
        //   cvs@miradahumana.com.ar
      
        //   Muchas gracias,
        //   Equipo Mirada Humana- AT`
        // },
        // {
        //     "imageUrl": "https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/439319511_2099353760449901_2845244578568097042_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH0xsBHVfKmnxrCKeuloZkg1fSrFyeGdXzV9KsXJ4Z1fDWNDleveuaLQ_suupsI0HgXMBmUp-ysLLmAbx0Y6tJx&_nc_ohc=0bVDcqmi2OAQ7kNvgFQEHC-&_nc_ht=scontent.faep24-2.fna&_nc_gid=AMn7s66Y4QfK4jNPy8fNr8g&oh=00_AYAAzQcGcjdIxany-y98Z6wg8B6hnxUnkNQHA1rzJhtORg&oe=671FA031",
        //     "email": "cvs@miradahumana.com.ar",
        //     "link": "https://desirsalud.com.ar/busqueda-laboral/",
        //     "title": "Decir Salud",
        //     "description": "Conecta con pacientes en busca de apoyo emocional. Ofrecemos oportunidades para terapeutas apasionados."
        // }
       
      
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
                    Centros No Recomendados
                </Typography>
                <CardNoRecomendado datos={filteredNoRecomendados} />
            </Box>
        </Container>
    );
}

export default Home;