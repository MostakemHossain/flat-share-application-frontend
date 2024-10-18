"use client";
import { useDeleteFlatMutation, useGetAllFlatQuery } from "@/redux/api/flat";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import CreateFlatModal from "./CreateFlatModal";
import ConfirmDeleteModal from "./FlatDelete";
import UpdateFlatModal from "./UpdateFlatModal"; 

const CreateFlat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false); 
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  const [flatToDelete, setFlatToDelete] = React.useState<string | null>(null);
  const [flatToUpdate, setFlatToUpdate] = React.useState<string | null>(null); 
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllFlatQuery({ ...query });
  const [deleteFlat] = useDeleteFlatMutation();

  if (isLoading) {
    return <Skeleton />;
  }

  const handleEdit = (id: string) => {
    setFlatToUpdate(id); 
    setIsUpdateModalOpen(true); 
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFlat(id).unwrap();
      if (res.id) {
        toast.success("Flat deleted Successfully");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsConfirmDeleteOpen(false);
    }
  };

  const handleOpenConfirmDelete = (id: string) => {
    setFlatToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "photos",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value[0]}
          alt="Flat"
          style={{ width: "80px", height: "auto" }}
        />
      ),
    },
    { field: "totalBedrooms", headerName: "Total Bedrooms", width: 150 },
    { field: "squareFeet", headerName: "Square Feet", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "totalRooms", headerName: "Total Rooms", width: 150 },
    {
      field: "parking",
      headerName: "Parking",
      width: 80,
      renderCell: (params) => (
        <Typography sx={{ mt: 3 }}>{params.value ? "Yes" : "No"}</Typography>
      ),
    },
    { field: "advanceAmount", headerName: "Advance Amount", width: 150 },
    { field: "rent", headerName: "Rent", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "availability",
      headerName: "Availability",
      width: 120,
      renderCell: (params) => (
        <Typography sx={{ mt: 3, color: params.value ? "green" : "red" }}>
          {params.value ? "Available" : "Not Available"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => handleEdit(params.id as string)} 
              startIcon={<FaEdit />}
            >
              
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenConfirmDelete(params.id as string)}
              startIcon={<FaTrash />}
            >
           
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];

  const rows = data?.data?.map((flat: any) => ({
    id: flat.id,
    photos: flat.photos,
    totalBedrooms: flat.totalBedrooms,
    squareFeet: flat.squareFeet,
    location: flat.location,
    totalRooms: flat.totalRooms,
    parking: flat.parking,
    advanceAmount: flat.advanceAmount,
    rent: flat.rent,
    description: flat.description,
    availability: flat.availability,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create A New Flat
        </Button>
        <CreateFlatModal open={isModalOpen} setOpen={setIsModalOpen} />
        <UpdateFlatModal
          open={isUpdateModalOpen}
          setOpen={setIsUpdateModalOpen}
          flatId={flatToUpdate} 
        />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Flats"
        />
      </Stack>

      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">All Flats ({rows?.length || 0})</Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        autoHeight
        rowHeight={80}
      />

      <ConfirmDeleteModal
        open={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        flatId={flatToDelete}
      />
    </Box>
  );
};

export default CreateFlat;
