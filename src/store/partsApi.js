import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Тестовый ключ из официальной документации веб-сервиса
const API_KEY = import.meta.env.VITE_API_KEY || '00000000-0000-0000-0000-000000000001'; 

export const partsApi = createApi({
  reducerPath: 'partsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/hs/hsprice' }),
  endpoints: (builder) => ({
    
    getBrands: builder.query({
      query: (number) => `?key=${API_KEY}&number=${encodeURIComponent(number)}`,
      transformResponse: (response) => {
        if (response && response.error) {
          throw new Error(response.error);
        }
        
        if (!response || !response.goods || response.goods.length === 0) {
          return [];
        }

        const uniqueBrands = response.goods
          .map((item) => item.brand)
          .filter(Boolean);

        return [...new Set(uniqueBrands)];
      },
    }),

    getAnalogs: builder.query({
      query: ({ number, brand }) => 
        `?key=${API_KEY}&number=${encodeURIComponent(number)}&brand=${encodeURIComponent(brand)}&analogues=on&info=on`,
      transformResponse: (response) => {
        if (response && response.error) {
          throw new Error(response.error);
        }
        return response?.goods || [];
      },
    }),

  }),
});

export const { useGetBrandsQuery, useLazyGetAnalogsQuery } = partsApi;
