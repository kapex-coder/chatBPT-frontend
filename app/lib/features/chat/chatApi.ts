import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openai.com/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "chat/completions",
        method: "POST",
        body: {
          model: "gpt-3.5-turbo",
          messages: message,
          temperature: 0.7,
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
