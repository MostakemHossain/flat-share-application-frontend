"use client";
import { useGetAllFlatQuery } from "@/redux/api/flat";
import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateFlatModal from "./CreateFlatModal";

const CreateFlat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data, isLoading } = useGetAllFlatQuery("");

  if (isLoading) {
    return <Skeleton />;
  }

  const handleEdit = (id: string) => {
    console.log("Edit flat with ID:", id);
    // Implement edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete flat with ID:", id);
    // Implement delete logic here
  };

  // Define the columns for the DataGrid
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
            ></Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.id as string)}
              startIcon={<FaTrash />}
            ></Button>
          </Stack>
        </Box>
      ),
    },
  ];

  const rows = data.data.map((flat: any) => ({
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
  }));

  return (
    <Box sx={{  width: "100%" }}>
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
        <TextField size="small" placeholder="Search Flats" />
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        autoHeight
        rowHeight={80}
      />
    </Box>
  );
};

export default CreateFlat;
