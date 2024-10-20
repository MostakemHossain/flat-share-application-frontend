"use client";
import { useGetAllEmployeesQuery } from "@/redux/api/employeeApi";
import { useDebounced } from "@/redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import CreateAEmployeeModal from "./CreateAEmployeeModal";

const ManageEmployees = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetAllEmployeesQuery({ ...query });

  if (isLoading) {
    return (
      <Box>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    );
  }

  const employees = data || [];

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Profile Photo",
      width: 120,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 76, height: 76 }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "contactNo", headerName: "Contact Number", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 170,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id as string)}
          sx={{
            color: "green",
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id as string)}
          sx={{
            color: "red",
          }}
        />,
      ],
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
    // Add delete logic here
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for ID:", id);
    // Add edit logic here
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create A New Employee
        </Button>
        <CreateAEmployeeModal open={isModalOpen} setOpen={setIsModalOpen} />

        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Employees"
        />
      </Stack>

      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">All Employees</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pagination
          getRowId={(row) => row.id}
          rowHeight={90}
        />
      </Box>
    </Box>
  );
};

export default ManageEmployees;
