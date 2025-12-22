import { useNavigate } from "react-router-dom";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetPagedQuizzesQuery,
  useLazyGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../api/api";
import type { CreateQuizDto, UpdateQuizDto, QuizDetailDto } from "../types";
import { useToast } from "@/app/providers/ToastProvider";
import { useCallback } from "react";
import type { Page } from "@/shared/types/page";
import type { QuizViewDto } from "../types";

/**
 * useQuiz Hook
 * Façade hook for Quiz CRUD operations with toast notifications
 */
type UseQuizParams = {
  page: number;
  size: number;
};

const useQuiz = ({ page, size }: UseQuizParams) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Queries
  const {
    data: quizzes,
    isLoading: isLoadingQuizzes,
    error: getQuizzesError,
    refetch: refetchQuizzes,
  } = useGetPagedQuizzesQuery({ page, size });

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
    quizData: CreateQuizDto
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
    quizData: UpdateQuizDto
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
    async (quizId: string): Promise<QuizDetailDto | undefined> => {
      try {
        // preferCacheValue=true keeps it snappy if already cached
        const quizDetail = await getQuizByIdTrigger(quizId, true).unwrap();
        return quizDetail;
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
    quizzes: quizzes as Page<QuizViewDto> | undefined,

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

export default useQuiz;
