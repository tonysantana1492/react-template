import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_API } from 'config';
import { storage } from 'utils/storage';

export const userURL = `${APP_API}/auth/`;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: userURL,
		prepareHeaders: (headers, { getState, endpoint }) => {
			const token = storage.getToken();

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		},
		credentials: 'include',
	}),
	tagTypes: ['User'],
	endpoints: build => ({
		getAllUsers: build.query({
			query: () => ({ url: 'users' }),
		}),

		loginUser: build.mutation({
			query: model => ({
				url: 'login',
				method: 'POST',
				body: model,
			}),
			transformResponse: (response, meta, arg) => {
				return response;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response;
			},
			invalidatesTags: ['User'],
		}),

		registerUser: build.mutation({
			query: model => ({
				url: 'register',
				method: 'POST',
				body: model,
			}),
			transformResponse: (response, meta, arg) => {
				return response;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response;
			},
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useGetAllUsersQuery, useRegisterUserMutation, useLoginUserMutation } = userApi;
