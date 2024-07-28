import { Box, Button, Typography } from "@mui/material";

const JoinAgent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "primary.main",
        fontWeight: 700,
        color: "white",
        marginTop: "50px",
        padding: "50px",
      }}
    >
      <Box
        sx={{
          flex: "1",
          marginBottom: { xs: "20px", md: 0 },
          marginRight: { xs: 0, md: "20px" },
        }}
      >
        <Typography variant="h3" component="div" sx={{ mb: 2 }}>
          Want To Become A Real Estate Agent?
        </Typography>
        <Typography variant="subtitle1" component="div">
          We&apos;ll help you to grow your career and growth.
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#007BFF",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#f1f1f1",
            color: "#0c0c0c",
          },
          minWidth: "150px",
        }}
      >
        SignUp Today
      </Button>
    </Box>
  );
};

export default JoinAgent;
