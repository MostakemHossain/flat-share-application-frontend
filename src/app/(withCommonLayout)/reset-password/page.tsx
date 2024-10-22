"use client";

import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { authKey } from "@/constants/authKey";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { zodResolver } from "@hookform/resolvers/zod";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const token = searchParams.get("token");
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
  }, [token]);

  const onSubmit = async (values: FieldValues) => {
    const updatedData = { ...values, id };

    try {
      const res = await resetPassword(updatedData);

      if (res?.data?.id) {
        toast.success("Password reset successfully!");
        localStorage.removeItem(authKey);
        deleteCookies([authKey, "refreshToken"]);
        router.push("/");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "auto", sm: "100vh" },
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
          mt: { xs: 4, sm: 0 },
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
            <LockResetIcon sx={{ color: "primary.main" }} />
          </Box>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mt: 2, mb: 3, color: "text.primary" }}
          >
            Reset Your Password
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Enter your new password below to reset your account password.
          </Typography>
        </Stack>

        <FlatMatchForm
          onSubmit={onSubmit}
          defaultValues={{ password: "" }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FlatMatchInput
                name="password"
                type="password"
                label="New Password"
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
            Reset Password
          </Button>
        </FlatMatchForm>
      </Box>
    </Stack>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;
