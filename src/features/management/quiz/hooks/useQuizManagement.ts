import { useToast } from "@/app/providers/ToastProvider";
import type {
  QuizDetail,
  UseQuizParams,
} from "@/features/management/quiz/types";
import {
  mapPagedQuizSummaries,
  mapToQuizDetail,
} from "@/features/management/quiz/utils/mapper";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetPagedQuizzesQuery,
  useLazyGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../api/api";
import type { CreateQuizRequest, UpdateQuizRequest } from "../types";

/**
 * useQuiz Hook
 * Façade hook for Quiz CRUD operations with toast notifications
 */

const useQuizManagement = ({ page, size }: UseQuizParams) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Queries
  const {
    data: quizzesDto,
    isLoading: isLoadingQuizzes,
    error: getQuizzesError,
    refetch: refetchQuizzes,
  } = useGetPagedQuizzesQuery({ page, size });

  const quizzes = useMemo(
    () => mapPagedQuizSummaries(quizzesDto),
    [quizzesDto]
  );

  // Mutations
  const [
    createQuizMutation,
    { isLoading: isCreatingQuiz, error: createQuizError },
  ] = useCreateQuizMutation();

  const [
    updateQuizMutation,
    { isLoading: isUpdatingQuiz, error: updateQuizError },
  ] = useUpdateQuizMutation();

  const [
    deleteQuizMutation,
    { isLoading: isDeletingQuiz, error: deleteQuizError },
  ] = useDeleteQuizMutation();

  const [
    getQuizByIdTrigger,
    { isFetching: isLoadingQuizDetail, error: getQuizDetailError },
  ] = useLazyGetQuizByIdQuery();

  /**
   * Create a new quiz
   * Shows success/error toast and navigates on success
   */
  const handleCreateQuiz = async (
    quizData: CreateQuizRequest
  ): Promise<boolean> => {
    try {
      const newQuiz = await createQuizMutation(quizData).unwrap();
      showSuccess("Quiz created successfully!");
      navigate(`/management/quizzes/${newQuiz.id}`);
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

    // ERROR STATES
    getQuizzesError,
    createQuizError,
    updateQuizError,
    deleteQuizError,
    getQuizDetailError,

    // ACTIONS
    handleCreateQuiz,
    handleUpdateQuiz,
    handleDeleteQuiz,
    handleViewQuizDetail,
    refetchQuizzes,
  };
};

export default useQuizManagement;
