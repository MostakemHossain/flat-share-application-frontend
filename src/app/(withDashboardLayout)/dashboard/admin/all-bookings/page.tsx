"use client";
import { authKey } from "@/constants/authKey";
import { useApprovedBookingRequestMutation } from "@/redux/api/bookingApi";
import { getFormLocalStorage } from "@/utils/local-storage";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyBookings = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [approvedBookingRequest] = useApprovedBookingRequestMutation();

  const statusOptions = ["PENDING", "BOOKING", "REJECTED"];
  const statusColors: { [key: string]: "warning" | "success" | "error" } = {
    PENDING: "warning",
    BOOKING: "success",
    REJECTED: "error",
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getFormLocalStorage(authKey);

        const response = await fetch(
          "https://flat-match-backend.vercel.app/api/v1/bookings/all-booking-request",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const result = await response.json();
        setData(result.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await approvedBookingRequest({
        data: { status: newStatus },
        id: id,
      }).unwrap();
      if (res.id) {
        toast.success("Booking Approval Successfully");
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
          value={params?.value}
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

  if (error) {
    return (
      <Box sx={{ color: "error.main", textAlign: "center", marginTop: 3 }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  const rows =
    data?.map((booking: any) => ({
      id: booking?.id,
      status: booking?.status,
      createdAt: new Date(booking.createdAt).toLocaleString() || "",
      flatLocation: booking?.flat?.location || "",
      flatSquareFeet: booking?.flat?.squareFeet || 0,
      flatBedrooms: booking?.flat?.totalBedrooms || 0,
      flatRooms: booking?.flat?.totalRooms || 0,
      flatRent: booking?.flat?.rent || 0,
      flatDescription: booking?.flat?.description || "",
      flatUtilities: booking?.flat?.utilitiesDescription || "",
      flatPhoto: booking?.flat?.photos[0] || "",
    })) || [];

  const totalBookings = rows?.length;

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
