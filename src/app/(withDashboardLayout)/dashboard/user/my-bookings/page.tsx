"use client";
import { useGetMyBookingsQuery } from "@/redux/api/bookingApi";
import { Avatar, Box, Chip, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const MyBookings = () => {
  const { data, isLoading } = useGetMyBookingsQuery({});

  const statusColors: { [key: string]: "warning" | "success" | "error" } = {
    PENDING: "warning",
    BOOKING: "success",
    REJECTED: "error",
  };

  const columns: GridColDef[] = [
    {
      field: "flatPhoto",
      headerName: "Photo",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
          src={params.value}
          alt="Flat Photo"
          sx={{ width: 80, height: 80 }}
        />
      ),
    },
    { field: "flatLocation", headerName: "Flat Location", width: 200 },
    { field: "flatSquareFeet", headerName: "Square Feet", width: 120 },
    { field: "flatBedrooms", headerName: "Bedrooms", width: 120 },
    { field: "flatRooms", headerName: "Rooms", width: 120 },
    { field: "flatRent", headerName: "Rent ($)", width: 120 },
    { field: "flatDescription", headerName: "Description", width: 400 },
    { field: "flatUtilities", headerName: "Utilities", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params?.value}
          color={statusColors[params?.value] || "default"}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Skeleton width={300} height={80} />
        <Skeleton width={300} height={80} />
        <Skeleton width={300} height={80} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", marginTop: "30px" }}>
      <Typography variant="h4" component="h2" sx={{ mb: 5 }}>
        My Bookings ({data?.data?.length || 0})
      </Typography>
      <DataGrid
        rows={
          data?.data?.map((booking: any) => ({
            id: booking?.id,
            status: booking?.status,
            createdAt: new Date(booking?.createdAt).toLocaleString(),
            flatLocation: booking?.flat?.location,
            flatSquareFeet: booking?.flat?.squareFeet,
            flatBedrooms: booking?.flat?.totalBedrooms,
            flatRooms: booking?.flat?.totalRooms,
            flatRent: booking?.flat?.rent,
            flatDescription: booking?.flat?.description,
            flatUtilities: booking?.flat?.utilitiesDescription,
            flatPhoto: booking?.flat?.photos[0],
          })) || []
        }
        columns={columns}
        autoHeight
        rowHeight={90}
      />
    </Box>
  );
};

export default MyBookings;
