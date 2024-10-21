"use client";

import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useGetASingleFlatQuery } from "@/redux/api/flat";
import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import Image from "next/image";
import { toast } from "sonner";
import loading from "../../../../../public/an.json";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

interface FlatDetailsProps {
  params: {
    flatId: string;
  };
}

const FlatDetails = ({ params }: FlatDetailsProps) => {
  const { data: userData } = useGetSingleUserQuery({});
  const { data, isLoading } = useGetASingleFlatQuery(params.flatId);
  const [createBooking] = useCreateBookingMutation();

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
        <Lottie
          animationData={loading}
          loop={true}
          style={{ width: "300px", height: "300px" }}
        />
      </Box>
    );
  }

  if (!data) return <Typography>No flat found</Typography>;

  const flat = data;

  const makeBooking = async () => {
    if (!userData) {
      toast.error("Please log in first");
      return;
    }
    try {
      const res = await createBooking({ flatId: params.flatId }).unwrap();

      if (res.id) {
        toast.success("Booking created successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 10 } }}>
      <Box sx={{ mb: 4 }}>
        <Image
          src={flat.photos[0]}
          alt="Flat Image"
          width={1500}
          height={700}
          style={{
            borderRadius: "8px",
            objectFit: "cover",
            width: "100%",
            maxHeight: "100vh",
          }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "underline",
          marginBottom: "10px",
          color: "#EC5312",
        }}
      >
        Description:
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
      >
        {flat.description}
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#f0f4ff",
              color: "#1a237e",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Rent Details
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontSize: "1.2rem" }}
            >
              ${flat.rent}/month
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Advance: ${flat.advanceAmount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 5.8,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#fef4e5",
              color: "#ff6f00",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Typography variant="body1">{flat.location}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffe0b2",
            }}
          >
            <Avatar sx={{ mr: 2, backgroundColor: "#f57c00" }}>🛏️</Avatar>
            <Typography variant="h6">Total Bedrooms</Typography>
            <Typography variant="body1">{`${flat.totalBedrooms} bedrooms`}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#c8e6c9",
            }}
          >
            <Avatar sx={{ mr: 2, backgroundColor: "#388e3c" }}>🛋️</Avatar>
            <Typography variant="h6">Total Rooms</Typography>
            <Typography variant="body1">{`${flat.totalRooms} rooms`}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#bbdefb",
            }}
          >
            <Avatar sx={{ mr: 2, backgroundColor: "#1976d2" }}>📏</Avatar>
            <Typography variant="h6">Square Feet</Typography>
            <Typography variant="body1">{`${flat.squareFeet} sq. ft.`}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffe0e0",
            }}
          >
            <Avatar sx={{ mr: 2, backgroundColor: "#d32f2f" }}>🚗</Avatar>
            <Typography variant="h6">Parking</Typography>
            <Typography variant="body1">
              {flat.parking ? "Available" : "Not Available"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            sx={{
              color: "#EC5312",
            }}
            variant="h4"
            gutterBottom
          >
            Utilities & Availability
          </Typography>
          <List>
            <ListItem>
              <Avatar sx={{ mr: 2 }}>💡</Avatar>
              <ListItemText
                primary="Utilities"
                sx={{
                  color: "#EC5312",
                  font: "123px",
                }}
                secondary={flat?.utilitiesDescription}
              />
            </ListItem>
            <ListItem>
              <Avatar sx={{ mr: 2 }}>📅</Avatar>
              <ListItemText
                primary="Availability"
                secondary={flat?.availability ? "Available" : "Not Available"}
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Box
        sx={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}
      >
        <Button
          onClick={makeBooking}
          variant="contained"
          color="primary"
          size="large"
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default FlatDetails;
