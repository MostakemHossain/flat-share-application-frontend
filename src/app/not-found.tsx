"use client";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
      p={3}
      textAlign="center"
    >
      <ErrorOutlineIcon
        color="error"
        style={{ fontSize: isSmallScreen ? 60 : 80 }}
      />
      <Typography
        variant={isSmallScreen ? "h3" : "h1"}
        component="h1"
        gutterBottom
      >
        404
      </Typography>
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        component="h2"
        gutterBottom
      >
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 3 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
