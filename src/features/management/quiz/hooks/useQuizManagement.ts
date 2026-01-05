import { useToast } from "@/app/providers/ToastProvider";
import type { QuizDetail } from "@/features/management/quiz/types";
import { mapToQuizDetail } from "@/features/management/quiz/utils/mapper";
import { useGetPagedQuizzesQuery } from "@/shared/api";
import type { PageParamsRequest } from "@/shared/types/page";
import { useCallback } from "react";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useLazyGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../api/api";
import type { CreateQuizRequest, UpdateQuizRequest } from "../types";

/**
 * useQuiz Hook
 * Façade hook for Quiz CRUD operations with toast notifications
 */

const useQuizManagement = ({ page, size }: PageParamsRequest) => {
  const { showSuccess, showError } = useToast();

  // Queries
  const {
    data: quizzes,
    isLoading: isLoadingQuizzes,
    refetch: refetchQuizzes,
  } = useGetPagedQuizzesQuery({ page, size });

  // Mutations
  const [createQuizMutation, { isLoading: isCreatingQuiz }] =
    useCreateQuizMutation();

  const [updateQuizMutation, { isLoading: isUpdatingQuiz }] =
    useUpdateQuizMutation();

  const [deleteQuizMutation, { isLoading: isDeletingQuiz }] =
    useDeleteQuizMutation();

  const [getQuizByIdTrigger, { isFetching: isLoadingQuizDetail }] =
    useLazyGetQuizByIdQuery();

  /**
   * Create a new quiz
   * Shows success/error toast and navigates on success
   */
  const handleCreateQuiz = async (
    quizData: CreateQuizRequest
  ): Promise<boolean> => {
    try {
      await createQuizMutation(quizData).unwrap();
      showSuccess("Quiz created successfully!");
      return true;
    } catch (error) {
      console.error("Failed to create quiz:", error);
      showError("Failed to create quiz. Please try again.");
      return false;
    }
  };

  /**
   * Update an existing quiz
   * Shows success/error toast
   */
  const handleUpdateQuiz = async (
    quizId: string,
    quizData: UpdateQuizRequest
  ): Promise<boolean> => {
    try {
      await updateQuizMutation({ id: quizId, data: quizData }).unwrap();
      showSuccess("Quiz updated successfully!");
      return true;
    } catch (error) {
      console.error("Failed to update quiz:", error);
      showError("Failed to update quiz. Please try again.");
      return false;
    }
  };

  /**
   * Delete a quiz
   * Shows success/error toast
   */
  const handleDeleteQuiz = async (quizId: string): Promise<boolean> => {
    try {
      await deleteQuizMutation(quizId).unwrap();
      showSuccess("Quiz deleted successfully!");
      return true;
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      showError("Failed to delete quiz. Please try again.");
      return false;
    }
  };

  /* ------------------------Handle View Quiz Detail ------------------------------------------------- */
  const handleViewQuizDetail = useCallback(
    async (quizId: string): Promise<QuizDetail | undefined> => {
      try {
        // preferCacheValue=true keeps it snappy if already cached
        const quizDetail = await getQuizByIdTrigger(quizId, true).unwrap();
        return mapToQuizDetail(quizDetail);
      } catch (error) {
        console.error("Failed to get quiz details:", error);
        showError("Failed to get quiz details. Please try again.");
        return undefined;
      }
    },
    [getQuizByIdTrigger, showError]
  );

  return {
    // DATA
    quizzes,
    // LOADING STATES
    isLoadingQuizzes,
    isCreatingQuiz,
    isUpdatingQuiz,
    isDeletingQuiz,
    isLoadingQuizDetail,
    // ACTIONS
    handleCreateQuiz,
    handleUpdateQuiz,
    handleDeleteQuiz,
    handleViewQuizDetail,
    refetchQuizzes,
  };
};

export default useQuizManagement;
