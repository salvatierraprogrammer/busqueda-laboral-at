import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '@config/Firebase';

export const ecApi = createApi({
  reducerPath: "ecApi",
  baseQuery: async (args) => {
    return { data: args };
  },
  endpoints: (builder) => ({
    // Endpoint para obtener documentos desde una colección de Firestore
    getUsuarios: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "usuarios"));
          let usuarios = [];
          querySnapshot.forEach((doc) => {
            usuarios.push({ id: doc.id, ...doc.data() });
          });
          return { data: usuarios };
        } catch (error) {
          return { error: error.message };
        }
      }
    }),
  }),
});

// Exportamos los hooks generados por createApi para cada endpoint
export const {
  useGetUsuarios,
} = ecApi;