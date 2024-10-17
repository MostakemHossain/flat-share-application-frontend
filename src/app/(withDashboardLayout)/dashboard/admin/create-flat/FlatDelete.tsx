import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (flatId: string) => void;
  flatId: string | null;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  flatId,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 400,
          margin: "auto",
          marginTop: "20vh",
        }}
      >
        <Typography variant="h6">Confirm Deletion</Typography>
        <Typography variant="body1">
          Are you sure you want to delete this flat?
        </Typography>
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onConfirm(flatId as string)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
