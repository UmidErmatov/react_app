import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit'
import { mainApi, socketPort } from '../utils/constants'
import { io } from 'socket.io-client'

const messageAdapter = createEntityAdapter()

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${mainApi}:27321/v1`,
        prepareHeaders: (headers, { getState }) => {
            let token = localStorage.getItem("persist:root")
            token = JSON.parse(JSON.parse(token).auth)
            if (token) {
                headers.set("Authorization", "Bearer " + token.token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/employees/login',
                method: 'POST',
                body: credentials,
            })
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: '/employees/logout',
                method: 'POST',
                body: credentials
            })
        }),
        protected: builder.mutation({
            query: () => 'protected',
        }),
        getMessages: builder.query({
            query: (channel) => `chats/${channel}`,
            transformResponse(response) {
                return messageAdapter.addMany(
                    messageAdapter.getInitialState(),
                    response
                )
            },
            async onCasheEntryAdded(
                arg,
                { updateCashedData, casheDataLoaded, casheEntryRemoved }
            ) {
                const socket = io(`${mainApi}${socketPort}`)
                try {
                    await casheDataLoaded

                    const listener = (event) => {
                        const data = JSON.parse(event.data)
                        console.log('message data: ', data);
                        if (data.channel !== arg) return
                        updateCashedData((draft) => {
                            messageAdapter.upsertOne(draft, data)
                        })
                    }
                    socket.emit('message', listener)
                } catch { }
                await casheEntryRemoved
                socket.disconnect()
            }
        })
    }),
});

export const { useLoginMutation, useProtectedMutation, useLogoutMutation, useGetMessagesQuery } = api;