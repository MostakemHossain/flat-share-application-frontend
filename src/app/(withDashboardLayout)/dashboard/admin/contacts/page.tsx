"use client";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "@/redux/api/contactApi";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

const Contacts = () => {
  const { data, isLoading } = useGetContactQuery("");
  const [deleteContact] = useDeleteContactMutation();

  
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  const handleClickOpen = (id: string) => {
    setSelectedContactId(id); 
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
    setSelectedContactId(null); 
  };

  const handleDeleteConfirm = async () => {
    if (selectedContactId) {
      try {
        const res = await deleteContact(selectedContactId).unwrap();
        if (res.id) {
          toast.success("Contact delete successfully");
        }

        setOpen(false);
      } catch (error) {}
    }
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "contactNo", headerName: "Contact No", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          sx={{
            background: "#EC5312",
          }}
          onClick={() => handleClickOpen(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows =
    data?.data?.map((contact: any) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      contactNo: contact.contactNo,
      message: contact.message,
    })) || [];

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total Contacts: {rows?.length}
      </Typography>

      <DataGrid rows={rows} columns={columns} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Contact?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact? 
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="primary"
            autoFocus
            variant="contained"
            sx={{ backgroundColor: "#EC5312" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
