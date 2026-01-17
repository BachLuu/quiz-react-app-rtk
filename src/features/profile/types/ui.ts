/**
 * Profile UI Types
 */

import type { AuthUser } from "@/features/auth/types";

export type ProfileMode = "view" | "edit";

export type ProfileViewProps = {
  mode: ProfileMode;
  onModeChange: (mode: ProfileMode) => void;
};
export type ProfileCardProps = {
  user: AuthUser | null | undefined;
  isLoading?: boolean;
  onEditClick?: () => void;
  isEditMode?: boolean;
};
export type ProfileInfoProps = {
  user: AuthUser | null | undefined;
  isLoading?: boolean;
};
