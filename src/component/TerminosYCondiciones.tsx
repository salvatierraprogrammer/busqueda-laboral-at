import React from 'react';
import { Box, Typography } from '@mui/material';

const TerminosYCondiciones: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Términos y Condiciones
      </Typography>

      <Typography variant="h6">1. Aceptación de los Términos</Typography>
      <Typography paragraph>
        Al utilizar este sitio web, el usuario acepta íntegramente los términos y condiciones aquí establecidos. Estos términos pueden ser modificados en cualquier momento, por lo que se recomienda revisarlos periódicamente. El uso continuo del sitio web implica la aceptación de cualquier cambio realizado.
      </Typography>

      <Typography variant="h6">2. Objetivo del Sitio Web</Typography>
      <Typography paragraph>
        Este sitio web tiene como objetivo principal facilitar la visualización de información relevante para acompañantes terapéuticos y otros interesados en la comunidad. Los datos presentados en el sitio son recopilados de fuentes públicas o proporcionados por la comunidad de acompañantes terapéuticos, y están destinados exclusivamente para ser utilizados como referencia.
      </Typography>

      <Typography variant="h6">3. Protección de Datos</Typography>
      <Typography paragraph>
        Los datos personales que los usuarios proporcionen se almacenan en Firebase, un servicio de almacenamiento que utiliza mecanismos de cifrado para proteger la información. El sitio web no guarda cachés de datos en los dispositivos de los usuarios. No obstante, es posible que esta funcionalidad sea implementada en el futuro, de acuerdo con mejoras en la plataforma.
      </Typography>

      <Typography variant="h6">4. Derechos del Usuario</Typography>
      <Typography paragraph>
        De conformidad con la Ley de Protección de Datos Personales de la República Argentina (Ley N° 25.326), los usuarios tienen derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, los usuarios deben enviar un correo electrónico a acompanianteterapeuticoweb@gmail.com.
      </Typography>

      <Typography variant="h6">5. Exclusión de Responsabilidad</Typography>
      <Typography paragraph>
        El administrador de este sitio web no garantiza la veracidad ni la exactitud de la información proporcionada por terceros, ni se hace responsable del uso que terceros puedan hacer de los datos presentados en el sitio.
      </Typography>

      <Typography variant="h6">6. Propiedad Intelectual</Typography>
      <Typography paragraph>
        Todos los contenidos de este sitio web, incluyendo textos, imágenes y diseño, están protegidos por derechos de autor y otras leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin el consentimiento previo del titular de los derechos.
      </Typography>

      <Typography variant="h6">7. Modificaciones del Sitio Web</Typography>
      <Typography paragraph>
        El administrador del sitio web se reserva el derecho de modificar, suspender o discontinuar el servicio en cualquier momento y sin previo aviso, con el objetivo de mejorar la funcionalidad del sitio web.
      </Typography>

      <Typography variant="h6">8. Ley Aplicable y Jurisdicción</Typography>
      <Typography paragraph>
        Estos términos y condiciones se rigen por las leyes de la República Argentina. Cualquier controversia que surja de la interpretación o ejecución de estos términos será sometida a la jurisdicción de los tribunales competentes de la Ciudad Autónoma de Buenos Aires.
      </Typography>

      <Typography variant="h6">9. Eliminación o Modificación de Información</Typography>
      <Typography paragraph>
        Para solicitar la eliminación o modificación de información presentada en el sitio, el usuario deberá enviar un correo electrónico a acompanianteterapeuticoweb@gmail.com. El administrador del sitio web evaluará la solicitud y procederá a realizar los cambios necesarios en un plazo razonable, siempre cumpliendo con la normativa vigente.
      </Typography>
    </Box>
  );
};

export default TerminosYCondiciones;