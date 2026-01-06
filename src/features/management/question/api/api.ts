import { api } from "@/shared/api";
import type {
  QuestionDetailResponse,
  CreateQuestionRequest,
  UpdateQuestionRequest,
} from "../types";

const questionManagementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get single question by ID
     */
    getQuestionById: builder.query<QuestionDetailResponse, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Question", id }],
    }),

    /**
     * Create new question
     * Invalidates "Question" list cache after successful creation
     */
    createQuestion: builder.mutation<
      QuestionDetailResponse,
      CreateQuestionRequest
    >({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    /**
     * Update existing question
     * Invalidates both the specific question and the list cache
     */
    updateQuestion: builder.mutation<
      QuestionDetailResponse,
      { id: string; data: UpdateQuestionRequest }
    >({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Question", id },
        { type: "Question", id: "LIST" },
      ],
    }),

    /**
     * Delete question by ID
     * Invalidates "Question" list cache after successful deletion
     */
    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
  }),
});

export const {
  useGetQuestionByIdQuery,
  useLazyGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionManagementApi;
