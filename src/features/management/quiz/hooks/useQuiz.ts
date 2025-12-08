import { useNavigate } from "react-router-dom";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesQuery,
  useUpdateQuizMutation,
} from "../api/api";
import type { CreateQuizDto, UpdateQuizDto } from "../types";
import { useToast } from "@/app/providers/ToastProvider";

/**
 * useQuiz Hook
 * Façade hook for Quiz CRUD operations with toast notifications
 */
const useQuiz = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Queries
  const {
    data: quizzes,
    isLoading: isLoadingQuizzes,
    error: getQuizzesError,
    refetch: refetchQuizzes,
  } = useGetQuizzesQuery();

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

  return {
    // DATA
    quizzes: quizzes ?? [],

    // LOADING STATES
    isLoadingQuizzes,
    isCreatingQuiz,
    isUpdatingQuiz,
    isDeletingQuiz,

    // ERROR STATES
    getQuizzesError,
    createQuizError,
    updateQuizError,
    deleteQuizError,

    // ACTIONS
    handleCreateQuiz,
    handleUpdateQuiz,
    handleDeleteQuiz,
    refetchQuizzes,
  };
};

export default useQuiz;
