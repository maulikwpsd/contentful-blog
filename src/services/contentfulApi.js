import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { client } from "./contentfulClient";

export const contentfulApi = createApi({
  reducerPath: "contentfulApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Blog"],

  endpoints: (builder) => ({
    // Get all blogs
    getBlogs: builder.query({
      async queryFn(params = {}) {
        try {
          const response = await client.getEntries({
            content_type: "blogPost",
            include: 2,
            ...params,
          });

          return { data: response.items };
        } catch (error) {
          return { error };
        }
      },
    }),

    // Get single blog by slug
    getBlogBySlug: builder.query({
      async queryFn(slug) {
        try {
          const response = await client.getEntries({
            content_type: "blogPost",
            "fields.slug": slug,
            limit: 1,
            include: 2,
          });

          return { data: response.items[0] };
        } catch (error) {
          return { error };
        }
      },
    }),

    getPaginatedBlogs: builder.query({
      async queryFn({ page = 1, limit = 6 }) {
        try {
          const skip = (page - 1) * limit;

          const response = await client.getEntries({
            content_type: "blogPost",
            include: 2,
            order: "-sys.createdAt",
            skip,
            limit,
          });

          return {
            data: {
              blogs: response.items,
              total: response.total,
              totalPages: Math.ceil(response.total / limit),
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),

    // Get single blog by ID
    getBlogById: builder.query({
      async queryFn(id) {
        try {
          const response = await client.getEntry(id);

          return { data: response };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useGetPaginatedBlogsQuery,
} = contentfulApi;
