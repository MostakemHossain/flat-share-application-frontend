import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { userLogin } from "@/services/actions/userLogin";
import { userRegistration } from "@/services/actions/userRegistration";
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
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const registrationValidationSchema = z.object({
  fullName: z.string({
    required_error: "Full Name is required",
  }),
  userName: z.string({
    required_error: "User Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Enter a valid Email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    
});

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
  const handleRegistration = async (data: FieldValues) => {
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
        toast.error(res?.message || "An error occurred during Registration", {
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
    } catch (error: any) {
      toast.error(error.message || "An error occurred during Registration", {
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
          Register in your account
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <FlatMatchForm
        onSubmit={handleRegistration}
        resolver={zodResolver(registrationValidationSchema)}
      >
        <DialogContent>
          <Box>
            <FlatMatchInput
              label="FullName"
              type="text"
              fullWidth
              name="fullName"
              sx={{
                mb: 2,
              }}
            />
            <FlatMatchInput
              label="Username"
              type="text"
              fullWidth
              name="userName"
              sx={{
                mb: 2,
              }}
            />
            <FlatMatchInput
              label="Email"
              type="email"
              fullWidth
              name="email"
              sx={{
                mb: 2,
              }}
            />
            <FlatMatchInput
              label="Password"
              type="password"
              fullWidth
              name="password"
              sx={{
                mb: 2,
              }}
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
