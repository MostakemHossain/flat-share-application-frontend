"use client";
import { useGetAllFlatQuery } from "@/redux/api/flat";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import FeatureFlatCard from "../FeatureFlat/FeatureFlatCard";

const HotFlat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const query: Record<string, any> = {};
  if (debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllFlatQuery({ ...query });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          marginTop: "70px",
          marginBottom: "30px",
          justifyContent: "center",
          fontWeight: 700,
          textAlign: "center",
        }}
        component="h1"
        gutterBottom
      >
        Featured Flats for Rent
      </Typography>
      <Typography
        sx={{
          marginTop: "20px",
          maxWidth: "800px",
          textAlign: "center",
          margin: "auto",
          color: "gray",
        }}
        paragraph
      >
        Discover the best flats available for rent in prime locations. Each
        listing provides detailed information to help you find the perfect home
        for you and your family. Enjoy browsing through our top picks!
      </Typography>

      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Flats"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: "400px", width: "100%" }}
        />
      </Box>

      <Box sx={{ marginTop: "50px" }}>
        <Grid container spacing={2} justifyContent="center">
          {data?.data &&
            data?.data?.slice(0, 3).map((flat: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                {" "}
                <FeatureFlatCard flat={flat} />
              </Grid>
            ))}
        </Grid>
        
      </Box>
    </Container>
  );
};

export default HotFlat;
