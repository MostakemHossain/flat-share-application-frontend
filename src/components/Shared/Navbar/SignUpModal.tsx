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
import React from "react";

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
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            
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
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
      </DialogActions>
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
