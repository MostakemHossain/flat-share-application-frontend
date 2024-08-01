import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.Service";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Enter valid Email",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(1),
});
export type IUserLogin = {
  email: string;
  password: string;
};

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  open,
  onClose,
  onSwitchToSignUp,
}) => {
  const router = useRouter();
  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await userLogin(data);

      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success(res?.message, {
          duration: 5000,
          position: "bottom-right",
          icon: "✅",
          style: {
            background: "#ed5311",
            color: "white",
            fontSize: "16px",
            borderRadius: "20px",
          },
        });
        onClose();
        router.push("/");
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (error: any) {
     
      toast.error(error.message || "An error occurred during login", {
        duration: 5000,
        position: "bottom-right",
        icon: "❌",
        style: {
          background: "#ff4d4d",
          color: "white",
          fontSize: "16px",
          borderRadius: "20px",
        },
      });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box
          fontSize={"30px"}
          sx={{
            fontWeight: 700,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Sign in to your account
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <FlatMatchForm
        onSubmit={handleLogin}
        resolver={zodResolver(loginValidationSchema)}
      >
        <DialogContent>
          <Box>
            <FlatMatchInput
              name="email"
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
            />
            <FlatMatchInput
              label="Password"
              type="password"
              fullWidth
              name="password"
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Box>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember"> Remember me</label>
              </Box>
              <Link href="/forgot-password">
                <Typography
                  sx={{
                    color: "#ed5311",
                    fontWeight: "600",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            paddingLeft: "30px",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </DialogActions>
      </FlatMatchForm>
      <Box textAlign="center" py={2}>
        <Typography
          sx={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="body2"
        >
          Don&apos;t have an account?{" "}
          <Box
            sx={{
              color: "#ed5311",
              fontWeight: "600",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onSwitchToSignUp}
          >
            Sign up
          </Box>
        </Typography>
      </Box>
    </Dialog>
  );
};

export default SignInModal;
