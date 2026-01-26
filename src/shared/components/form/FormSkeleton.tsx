import { Box, Skeleton, Stack } from "@mui/material";

export interface FormSkeletonFieldConfig {
  type: "text" | "textarea" | "select" | "switch" | "row";
  /** Width for single fields, ignored for row type */
  width?: string | number;
  /** Height for textarea/select */
  height?: number;
  /** Number of children for row type */
  rowChildren?: number;
}

export interface FormSkeletonProps {
  /** Field configurations to render */
  fields?: FormSkeletonFieldConfig[];
  /** Animation type */
  animation?: "pulse" | "wave" | false;
  /** Show action buttons skeleton */
  showActions?: boolean;
}

const defaultFields: FormSkeletonFieldConfig[] = [
  { type: "text" },
  { type: "textarea", height: 100 },
  { type: "select" },
  { type: "switch" },
];

/**
 * FormSkeleton Component
 * Displays skeleton placeholders for form fields while data is loading
 */
export const FormSkeleton = ({
  fields = defaultFields,
  animation = "wave",
  showActions = true,
}: FormSkeletonProps) => {
  const renderField = (field: FormSkeletonFieldConfig, index: number) => {
    switch (field.type) {
      case "text":
        return (
          <Box key={index}>
            {/* Label skeleton */}
            <Skeleton
              animation={animation}
              variant="text"
              width={100}
              height={20}
              sx={{ mb: 0.5 }}
            />
            {/* Input skeleton */}
            <Skeleton
              animation={animation}
              variant="rounded"
              width={field.width ?? "100%"}
              height={56}
            />
          </Box>
        );

      case "textarea":
        return (
          <Box key={index}>
            {/* Label skeleton */}
            <Skeleton
              animation={animation}
              variant="text"
              width={100}
              height={20}
              sx={{ mb: 0.5 }}
            />
            {/* Textarea skeleton */}
            <Skeleton
              animation={animation}
              variant="rounded"
              width={field.width ?? "100%"}
              height={field.height ?? 100}
            />
          </Box>
        );

      case "select":
        return (
          <Box key={index}>
            {/* Label skeleton */}
            <Skeleton
              animation={animation}
              variant="text"
              width={80}
              height={20}
              sx={{ mb: 0.5 }}
            />
            {/* Select skeleton */}
            <Skeleton
              animation={animation}
              variant="rounded"
              width={field.width ?? "100%"}
              height={56}
            />
          </Box>
        );

      case "switch":
        return (
          <Stack key={index} direction="row" alignItems="center" spacing={1}>
            <Skeleton
              animation={animation}
              variant="rounded"
              width={42}
              height={26}
            />
            <Skeleton animation={animation} variant="text" width={60} />
          </Stack>
        );

      case "row":
        return (
          <Stack
            key={index}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            {Array.from({ length: field.rowChildren ?? 2 }).map((_, i) => (
              <Box key={i} flex={1}>
                {/* Label skeleton */}
                <Skeleton
                  animation={animation}
                  variant="text"
                  width={80}
                  height={20}
                  sx={{ mb: 0.5 }}
                />
                {/* Input skeleton */}
                <Skeleton
                  animation={animation}
                  variant="rounded"
                  width="100%"
                  height={56}
                />
              </Box>
            ))}
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => renderField(field, index))}

      {/* Action buttons skeleton */}
      {showActions && (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Skeleton
            animation={animation}
            variant="rounded"
            width={80}
            height={36}
          />
          <Skeleton
            animation={animation}
            variant="rounded"
            width={100}
            height={36}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default FormSkeleton;
