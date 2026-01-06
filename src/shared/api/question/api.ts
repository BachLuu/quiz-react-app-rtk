/**
 * Question API endpoints
 * Shared across all features
 */

import { api } from "../common/api";
import type { Page, Question } from "@/shared/types";

export const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get paged questions
     * Provides tag "Question" for automatic cache invalidation
     * Shared endpoint - can be used by any feature
     */
    getPagedQuestions: builder.query<
      Page<Question>,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `/questions/paged?page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "Question" as const,
                id,
              })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),
  }),
});

export const { useGetPagedQuestionsQuery, useLazyGetPagedQuestionsQuery } =
  questionApi;
