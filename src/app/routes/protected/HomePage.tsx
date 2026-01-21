import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Quiz,
  Speed,
  Security,
  Devices,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Quiz sx={{ fontSize: 48 }} />,
      title: "Quản lý Quiz",
      description:
        "Tạo và quản lý các bài quiz với nhiều loại câu hỏi đa dạng: trắc nghiệm, đúng/sai, điền khuyết.",
      color: "primary.main",
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: "Hiệu suất cao",
      description:
        "Hệ thống được tối ưu hóa với công nghệ hiện đại, đảm bảo trải nghiệm mượt mà.",
      color: "success.main",
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: "Bảo mật",
      description:
        "Hệ thống xác thực JWT với refresh token, đảm bảo an toàn dữ liệu người dùng.",
      color: "warning.main",
    },
    {
      icon: <Devices sx={{ fontSize: 48 }} />,
      title: "Responsive",
      description:
        "Giao diện thích ứng trên mọi thiết bị từ desktop đến mobile.",
      color: "info.main",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 4,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.08)",
          }}
        />

        <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
          <Box>
            <Chip
              label="v1.0.0"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Quiz Management System
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, maxWidth: 600, fontWeight: 400 }}
            >
              Hệ thống quản lý bài kiểm tra trực tuyến toàn diện, giúp bạn tạo,
              quản lý và theo dõi các bài quiz một cách dễ dàng.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/management/quiz")}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "grey.100",
                },
                px: 4,
              }}
            >
              Bắt đầu ngay
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/analytics")}
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
                px: 4,
              }}
            >
              Xem Analytics
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Features Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Tính năng nổi bật
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: 1,
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: feature.color,
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      width: 72,
                      height: 72,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Links */}
      <Grid container>
        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🚀 Truy cập nhanh
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1.5}>
              {[
                {
                  label: "Quản lý Quiz",
                  path: "/management/quiz",
                  desc: "Tạo và chỉnh sửa bài quiz",
                },
                {
                  label: "Quản lý User",
                  path: "/management/user",
                  desc: "Quản lý tài khoản người dùng",
                },
                {
                  label: "Analytics Dashboard",
                  path: "/analytics",
                  desc: "Xem thống kê hệ thống",
                },
                {
                  label: "Hồ sơ cá nhân",
                  path: "/profile",
                  desc: "Cập nhật thông tin cá nhân",
                },
              ].map((link) => (
                <Box
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <CheckCircle color="success" fontSize="small" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {link.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {link.desc}
                    </Typography>
                  </Box>
                  <ArrowForward fontSize="small" color="action" />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
