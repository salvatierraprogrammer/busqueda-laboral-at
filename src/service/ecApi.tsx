import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../config/Firebase';

export const ecApi = createApi({
  reducerPath: "ecApi",
  baseQuery: async (args) => {
    return { data: args };
  },
  endpoints: (builder) => ({
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
      },
    }),
  }),
});


// Hook correcto
export const { useGetUsuariosQuery } = ecApi;
