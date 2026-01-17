import { Box, Grid, Typography } from "@mui/material";
import {
  ProfileCard,
  ProfileForm,
  ProfileInfo,
} from "@/features/profile/components";
import { useProfile } from "@/features/profile/hooks";

const ProfilePage = () => {
  const {
    user,
    mode,
    isUpdating,
    error,
    startEditing,
    cancelEditing,
    saveProfile,
    getFormValues,
  } = useProfile();

  const isEditMode = mode === "edit";

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left Column - Profile Card */}
        <Grid component="div" size={{ xs: 12, md: 4 }}>
          <ProfileCard
            user={user}
            onEditClick={startEditing}
            isEditMode={isEditMode}
          />
        </Grid>

        {/* Right Column - Profile Info or Edit Form */}
        <Grid component="div" size={{ xs: 12, md: 8 }}>
          {isEditMode ? (
            <ProfileForm
              initialValues={getFormValues()}
              onSubmit={saveProfile}
              onCancel={cancelEditing}
              isSubmitting={isUpdating}
              error={error}
            />
          ) : (
            <ProfileInfo user={user} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
