"use client";
import {
  useGetAllUserQuery,
  useUpdateRoleAndStatusChangeMutation,
} from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

// Enums for UserRole and Status
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

enum Status {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

const ManageUsers = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllUserQuery({ ...query });
  const [updateRoleAndStatusChange] = useUpdateRoleAndStatusChangeMutation();

  const rows = data?.map((user: any) => ({
    id: user.id,
    fullName: user.fullName,
    userName: user.userName,
    email: user?.email,
    role: user.role,
    status: user.status,
    isDeleted: user.isDeleted,
    profilePhoto: user.profilePhoto,
  }));

  if (isLoading) {
    return <Skeleton />;
  }

  const handleRoleChange = async (id: string, newRole: UserRole) => {
    try {
      const res = await updateRoleAndStatusChange({
        id,
        data: { role: newRole },
      }).unwrap();
      if (res.id) {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    try {
      const res = await updateRoleAndStatusChange({
        id,
        data: { status: newStatus },
      }).unwrap();
      if (res.id) {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeletedChange = async (id: string, newIsDeleted: boolean) => {
    try {
      const res = await updateRoleAndStatusChange({
        id,
        data: { isDeleted: newIsDeleted },
      }).unwrap();
      if (res.id) {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating deleted status:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Profile Photo",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "https://via.placeholder.com/80"}
          alt="User"
          style={{ width: "80px", height: "auto", borderRadius: "50%" }}
        />
      ),
    },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "userName", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleRoleChange(params.row.id, e.target.value as UserRole)
          }
          size="small"
          sx={{
            backgroundColor:
              params.value === UserRole.ADMIN
                ? "lightblue"
                : params.value === UserRole.USER
                  ? "lightgreen"
                  : "white",
          }}
        >
          {Object.values(UserRole).map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleStatusChange(params.row.id, e.target.value as Status)
          }
          size="small"
          sx={{
            backgroundColor:
              params.value === Status.ACTIVE
                ? "lightgreen"
                : params.value === Status.BLOCKED
                  ? "lightcoral"
                  : "white",
          }}
        >
          {Object.values(Status).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "isDeleted",
      headerName: "Is Deleted",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.value ? "true" : "false"}
          onChange={(e) =>
            handleDeletedChange(params.row.id, e.target.value === "true")
          }
          size="small"
          sx={{
            backgroundColor:
              params.value === "true" ? "lightcoral" : "lightgreen",
          }}
        >
          <MenuItem value={"true"}>True</MenuItem>
          <MenuItem value={"false"}>False</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
        mb={2}
      >
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Users"
        />
      </Stack>

      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">All Users ({rows?.length || 0})</Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        rowHeight={100}
      />
    </Box>
  );
};

export default ManageUsers;
