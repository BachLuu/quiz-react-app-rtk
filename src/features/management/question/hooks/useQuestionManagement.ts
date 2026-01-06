import { useToast } from "@/app/providers/ToastProvider";
import { useGetPagedQuestionsQuery } from "@/shared/api";
import type { PageParamsRequest } from "@/shared/types";
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useLazyGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} from "../api";
import type {
  CreateQuestionRequest,
  UpdateQuestionRequest,
  QuestionDetail,
} from "../types";
import { mapToQuestionDetail } from "../utils/mapper";

const useQuestionManagement = ({ page, size }: PageParamsRequest) => {
  const { showError, showSuccess } = useToast();
  const [createQuestionMutation, { isLoading: isCreatingQuestion }] =
    useCreateQuestionMutation();
  const [updateQuestionMutation, { isLoading: isUpdatingQuestion }] =
    useUpdateQuestionMutation();
  const [deleteQuestionMutation, { isLoading: isDeletingQuestion }] =
    useDeleteQuestionMutation();
  const [getQuestionByIdTrigger, { isLoading: isLoadingQuestionDetail }] =
    useLazyGetQuestionByIdQuery();
  const { data: pagedQuestions, isLoading: isLoadingPagedQuestions } =
    useGetPagedQuestionsQuery({ page, size });

  const handleCreateQuestion = async (
    createQuestionDto: CreateQuestionRequest
  ): Promise<boolean> => {
    try {
      await createQuestionMutation(createQuestionDto).unwrap();
      showSuccess("Question created successfully");
      return true;
    } catch (error) {
      showError("Failed to create question");
      return false;
    }
  };

  const handleViewQuestionDetail = async (
    questionId: string
  ): Promise<QuestionDetail | undefined> => {
    try {
      const dto = await getQuestionByIdTrigger(questionId, true).unwrap();
      return mapToQuestionDetail(dto); // map DTO -> UI model
    } catch (error) {
      showError("Failed to fetch question details");
      return undefined;
    }
  };

  const handleUpdateQuestion = async (
    questionId: string,
    updateQuestionDto: UpdateQuestionRequest
  ): Promise<boolean> => {
    try {
      await updateQuestionMutation({
        id: questionId,
        data: updateQuestionDto,
      }).unwrap();
      showSuccess("Question updated successfully");
      return true;
    } catch (error) {
      showError("Failed to update question");
      return false;
    }
  };

  const handleDeleteQuestion = async (questionId: string): Promise<boolean> => {
    try {
      await deleteQuestionMutation(questionId).unwrap();
      showSuccess("Question deleted successfully");
      return true;
    } catch (error) {
      showError("Failed to delete question");
      return false;
    }
  };

  return {
    // Data
    questions: pagedQuestions,
    // Loading states
    isLoadingQuestions: isLoadingPagedQuestions,
    isCreatingQuestion,
    isUpdatingQuestion,
    isDeletingQuestion,
    isLoadingQuestionDetail,
    // Handlers
    handleCreateQuestion,
    handleViewQuestionDetail,
    handleUpdateQuestion,
    handleDeleteQuestion,
  };
};

export { useQuestionManagement };
export default useQuestionManagement;
