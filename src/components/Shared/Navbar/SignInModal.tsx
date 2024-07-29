import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.Service";
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
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserLogin>();
  const onSubmit: SubmitHandler<IUserLogin> = async (data) => {
    try {
      const res = await userLogin(data);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
      }
    } catch (error) {}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              required
              {...register("email")}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              required
              {...register("password")}
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
      </form>
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
