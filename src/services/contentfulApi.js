import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

export const contentfulApi = createApi({
  reducerPath: "contentfulApi",
  baseQuery: fakeBaseQuery(),

  endpoints: (builder) => ({
    getBlogs: builder.query({
      async queryFn() {
        try {
          const response = await client.getEntries({
            content_type: "blogPost",
            include: 2,
          });

          return { data: response.items };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetBlogsQuery } = contentfulApi;
