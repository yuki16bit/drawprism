import { nanoid } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_ENV !== 'production'
        ? `${process.env.REACT_APP_DEV_ENDPOINT}`
        : `${process.env.REACT_APP_PROD_ENDPOINT}`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/api/user',
      providesTags: ['User'],
    }),
    signUpUser: builder.mutation({
      query: (user) => ({
        url: '/api/user',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    signInUser: builder.mutation({
      query: (user) => ({
        url: '/api/user',
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    logOutUser: builder.mutation({
      query: (userUuid) => ({
        url: `/api/user/${userUuid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getSetting: builder.query({
      query: (roomUuid) => ({
        url: '/api/setting',
        method: 'GET',
        params: { room: roomUuid },
      }),
      providesTags: ['Setting'],
    }),
    createSetting: builder.mutation({
      query: (ownerUuid) => ({
        url: 'api/setting',
        method: 'POST',
        body: { ownerUuid },
      }),
      invalidatesTags: ['Setting'],
    }),
    updateSetting: builder.mutation({
      query: (updates) => ({
        url: '/api/setting',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Setting'],
    }),
    deleteSetting: builder.mutation({
      query: (roomUuid) => ({
        url: `/api/setting/${roomUuid}`,
        method: 'DELETE',
      }),
    }),
    getChatLogs: builder.mutation({
      query: (roomUuid) => ({
        url: `/api/setting/${roomUuid}`,
        method: 'POST',
        body: { logName: 'chat' },
      }),
      transformResponse: (response) => response.map((res) => ({ id: nanoid(), ...res })),
      invalidatesTags: ['Setting'],
    }),
    getParticipates: builder.mutation({
      query: (roomUuid) => ({
        url: `/api/setting/${roomUuid}`,
        method: 'POST',
        body: { logName: 'participate' },
      }),
      transformResponse: (response) => response.map((res) => ({ id: nanoid(), ...res })),
      invalidatesTags: ['Setting'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useLogOutUserMutation,
  useGetSettingQuery,
  useCreateSettingMutation,
  useUpdateSettingMutation,
  useDeleteSettingMutation,
  useGetChatLogsMutation,
  useGetParticipatesMutation,
} = apiSlice;
