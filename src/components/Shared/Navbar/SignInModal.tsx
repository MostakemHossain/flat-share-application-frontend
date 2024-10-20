import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.Service";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  CircularProgress, 
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
import React, { useState } from "react"; 
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
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (data: FieldValues) => {
    setLoading(true); 
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
        router.push("/dashboard");
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
    } finally {
      setLoading(false); 
    }
  };

  const handleDemoLogin = async (role: string) => {
    const demoCredentials = {
      email: role === "admin" ? "admin101@gmail.com" : "user00@gmail.com",
      password: role === "admin" ? "admin12345" : "user12345",
    };
    await handleLogin(demoCredentials);
  };

  const handleGoogleLogin = () => {
    
    toast.info("Google login not implemented yet");
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
            flexDirection: "column",
            gap: 2,
            paddingLeft: "30px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
        
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading} 
            startIcon={loading ? <CircularProgress size={20} /> : null} 
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

       
          <Stack direction="row" spacing={2} width="100%">
            <Button
              variant="outlined"
              color="primary" 
              fullWidth
              
              disabled={loading} 
              onClick={() => handleDemoLogin("user")}
            >
              Demo User
            </Button>
            <Button
              variant="outlined"
              color="error" 
              fullWidth
              disabled={loading} 
              onClick={() => handleDemoLogin("admin")}
            >
              Demo Admin
            </Button>
          </Stack>

          
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<GoogleIcon />} 
            onClick={handleGoogleLogin}
            disabled={loading} 
          >
            Sign in with Google
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
