import { db } from '@config/firebase'; // Asegúrate de que aquí estés importando db correctamente
import { collection, addDoc } from 'firebase/firestore';

export const sendEmailWithFirebase = async (emailContent) => {
  try {
    // Asegúrate de que 'emails' sea el nombre de tu colección
    const docRef = await addDoc(collection(db, 'emails'), {
      subject: emailContent.subject,
      body: emailContent.body,
      from: emailContent.from,
      to: emailContent.to,
      timestamp: new Date(), // Añadir una marca de tiempo si lo deseas
    });
    console.log('Email guardado con ID: ', docRef.id);
  } catch (error) {
    throw new Error('Error al enviar el correo: ' + error.message);
  }
};