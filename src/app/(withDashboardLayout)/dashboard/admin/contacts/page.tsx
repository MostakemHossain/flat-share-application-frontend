"use client";
import { useGetContactQuery } from "@/redux/api/contactApi";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Contacts = () => {
  const { data, isLoading } = useGetContactQuery("");

  const handleDelete = (id: any) => {
    console.log("Deleting contact with id:", id);
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
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
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
    </Box>
  );
};

export default Contacts;
