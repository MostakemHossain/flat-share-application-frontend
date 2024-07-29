import { userLogin } from "@/services/actions/userLogin";
import { userRegistration } from "@/services/actions/userRegistration";
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
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type IUserRegistration = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
};

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  open,
  onClose,
  onSwitchToSignIn,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserRegistration>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IUserRegistration> = async (data) => {
    try {
      const res = await userRegistration(data);
      if (res?.data?.id) {
        const result = await userLogin({
          email: data.email,
          password: data.password,
        });
        storeUserInfo({ accessToken: result?.data?.accessToken });
        toast.success(result?.message, {
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
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error.message);
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
          Register in your account
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
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              required
              {...register("fullName")}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              required
              {...register("userName")}
            />
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
            ></Stack>
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
            Sign Up
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
          Already have an account?{" "}
          <Box
            sx={{
              color: "#ed5311",
              fontWeight: "600",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onSwitchToSignIn}
          >
            Sign in
          </Box>
        </Typography>
      </Box>
    </Dialog>
  );
};

export default SignUpModal;
