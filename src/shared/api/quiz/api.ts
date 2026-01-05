/**
 * Quiz API endpoints
 * Shared across all features
 */

import { api } from "../common/api";
import type { Page, Quiz } from "@/shared/types";

export const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get paged quizzes
     * Provides tag "Quiz" for automatic cache invalidation
     * Shared endpoint - can be used by any feature
     */
    getPagedQuizzes: builder.query<Page<Quiz>, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/quizzes/paged?page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "Quiz" as const,
                id,
              })),
              { type: "Quiz", id: "LIST" },
            ]
          : [{ type: "Quiz", id: "LIST" }],
    }),
  }),
});

export const { useGetPagedQuizzesQuery, useLazyGetPagedQuizzesQuery } = quizApi;
