"use client";

import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { authKey } from "@/constants/authKey";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Must be at least 6 characters long"),
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const ChangePassword = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();
      console.log(res.message);
      if (res.message === "Password changed successfully") {
        toast.success("Password changed successfully");
        localStorage.removeItem(authKey);
        deleteCookies([authKey, "refreshToken"]);
        router.push("/");
        router.refresh();
      } else {
        toast.error("Password Incorrect");
      }
    } catch (error) {
      toast.error("Password Incorrect");
    }
  };

  return (
    <Box
      sx={{
        px: 5,
        py: 3,
        maxWidth: 500,
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        mx: "auto",
        mt: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            "& svg": {
              width: 60,
              height: 60,
            },
          }}
        >
          <LockIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1, mt: 2 }}>
          Change Password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ensure your account is secure by updating your password.
        </Typography>
      </Stack>
      <FlatMatchForm
        onSubmit={onSubmit}
        defaultValues={{ oldPassword: "", newPassword: "" }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FlatMatchInput
              required
              name="oldPassword"
              type="password"
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FlatMatchInput
              required
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            py: 1.5,
            fontWeight: 600,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Change Password
        </Button>
      </FlatMatchForm>
    </Box>
  );
};

export default ChangePassword;
