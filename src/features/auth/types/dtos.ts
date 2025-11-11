/**
 * DTO cho Login request
 * Best practice: Validation sẽ được xử lý ở component level với react-hook-form hoặc formik
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * DTO cho Register request
 * Best practice: Tách biệt registration data với user model
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string; // ISO string format
  acceptTerms: boolean; // Required checkbox trong form
}

/**
 * DTO cho Change Password
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * DTO cho Forgot Password
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * DTO cho Reset Password (từ email link)
 */
export interface ResetPasswordRequest {
  token: string; // Token từ email
  newPassword: string;
  confirmPassword: string;
}

/**
 * DTO cho Update Profile
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatar?: string | File; // Support cả URL và File upload
}
/**
 * Interface đại diện cho thông tin user đã authenticate
 * Kế thừa từ User model nhưng loại bỏ các thông tin nhạy cảm
 */
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  roles: string[]; // Simplified roles - chỉ lấy role names
  isActive: boolean;
}
/**
 * Response trả về từ API khi login/register thành công
 * Best practice: Tách biệt token và user info
 */

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string; // Optional - cho JWT refresh flow
  expiresIn?: number; // Thời gian hết hạn token (seconds)
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  avatar?: string | File;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
