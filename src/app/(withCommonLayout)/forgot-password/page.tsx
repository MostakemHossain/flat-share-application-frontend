"use client";

import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
});

const ForgotPassword = () => {
  const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await forgotPassword(values);
      console.log(res);

      if ("data" in res && res.data.status === 200) {
        toast.success("Check Your Email for Reset Link");
      } else {
        throw new Error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: { sm: "100vh" },
        px: 2,
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 4,
          maxWidth: 500,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
          textAlign: "center",
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Box
            sx={{
              "& svg": {
                width: 80,
                height: 80,
              },
            }}
          >
            <EmailIcon sx={{ color: "primary.main" }} />
          </Box>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 3, color: "text.primary" }}
          >
            Forgot Your Password?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Enter your email and we will send you a link to reset your password.
          </Typography>
        </Stack>

        {isSuccess && (
          <Box>
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 3 }}
            >
              An email with a reset password link has been sent to your inbox.
            </Alert>
          </Box>
        )}

        {!isSuccess && (
          <FlatMatchForm
            onSubmit={onSubmit}
            defaultValues={{ email: "" }}
            resolver={zodResolver(validationSchema)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FlatMatchInput
                  name="email"
                  type="email"
                  label="Email Address"
                  sx={{ mb: 3 }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", py: 1.5 }}
            >
              Send Reset Link
            </Button>
          </FlatMatchForm>
        )}
      </Box>
    </Stack>
  );
};

export default ForgotPassword;
