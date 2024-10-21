"use client";
import {
  useApprovedBookingRequestMutation,
  useGetALLBookingRequestQuery,
} from "@/redux/api/bookingApi";
import {
  Avatar,
  Box,
  Chip,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { toast } from "sonner";

const MyBookings = () => {
  const { data, isLoading } = useGetALLBookingRequestQuery({});
  const [approvedBookingRequest] = useApprovedBookingRequestMutation();

  const statusOptions = ["PENDING", "BOOKING", "REJECTED"];
  const statusColors: { [key: string]: "warning" | "success" | "error" } = {
    PENDING: "warning",
    BOOKING: "success",
    REJECTED: "error",
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await approvedBookingRequest({
        data: { status: newStatus },
        id: id,
      }).unwrap();
      if (res.id) {
        toast.success("Booking Approval successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
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
        <Select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          sx={{ width: "100%" }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Chip
                label={option}
                color={statusColors[option] || "default"}
                sx={{ width: "100%" }}
              />
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  const rows =
    data?.data?.map((booking: any) => ({
      id: booking?.id,
      status: booking?.status,
      createdAt: booking?.createdAt
        ? new Date(booking.createdAt).toLocaleString()
        : "N/A",
      flatLocation: booking?.flat?.location || "N/A",
      flatSquareFeet: booking?.flat?.squareFeet || 0,
      flatBedrooms: booking?.flat?.totalBedrooms || 0,
      flatRooms: booking?.flat?.totalRooms || 0,
      flatRent: booking.flat?.rent || 0,
      flatDescription: booking.flat?.description || "N/A",
      flatUtilities: booking.flat?.utilitiesDescription || "N/A",
      flatPhoto: booking.flat?.photos?.[0] || "https://via.placeholder.com/150",
    })) || [];

  const totalBookings = rows?.length;

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
        My Bookings ({totalBookings})
      </Typography>
      <DataGrid rows={rows} columns={columns} autoHeight rowHeight={90} />
    </Box>
  );
};

export default MyBookings;
