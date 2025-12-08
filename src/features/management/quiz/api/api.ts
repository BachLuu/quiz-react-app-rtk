import type {
  CreateQuizDto,
  UpdateQuizDto,
} from "@/features/management/quiz/types";
import { api } from "@/shared/services";
import type { Quiz } from "@/shared/types/quiz";

/**
 * Quiz API endpoints
 * Best practice: Full CRUD operations with proper tags for cache invalidation
 */
export const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get all quizzes
     * Provides tag "Quiz" for automatic cache invalidation
     */
    getQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Quiz" as const, id })),
              { type: "Quiz", id: "LIST" },
            ]
          : [{ type: "Quiz", id: "LIST" }],
    }),

    /**
     * Get single quiz by ID
     */
    getQuizById: builder.query<Quiz, string>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Quiz", id }],
    }),

    /**
     * Create new quiz
     * Invalidates "Quiz" list cache after successful creation
     */
    createQuiz: builder.mutation<Quiz, CreateQuizDto>({
      query: (body) => ({
        url: "/quizzes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }],
    }),

    /**
     * Update existing quiz
     * Invalidates both the specific quiz and the list cache
     */
    updateQuiz: builder.mutation<Quiz, { id: string; data: UpdateQuizDto }>({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Quiz", id },
        { type: "Quiz", id: "LIST" },
      ],
    }),

    /**
     * Delete quiz
     * Invalidates both the specific quiz and the list cache
     */
    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Quiz", id },
        { type: "Quiz", id: "LIST" },
      ],
    }),

    /**
     * Patch/Partial update quiz
     * For updating only specific fields
     */
    patchQuiz: builder.mutation<
      Quiz,
      { id: string; data: Partial<UpdateQuizDto> }
    >({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Quiz", id },
        { type: "Quiz", id: "LIST" },
      ],
    }),
  }),
});

/**
 * Auto-generated hooks for components
 * Best practice: Export hooks for easy usage in React components
 */
export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  usePatchQuizMutation,
} = quizApi;
