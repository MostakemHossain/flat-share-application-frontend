"use client";
import { useGetAllFlatQuery } from "@/redux/api/flat";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FeatureFlatCard from "./FeatureFlatCard";

const FeatureFlatSection = () => {
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
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h3" fontWeight={600} align="center" gutterBottom>
          Explore Our Featured Flats
        </Typography>
        <Typography
          sx={{
            color: "gray",
          }}
          align="center"
          gutterBottom
        >
          Find your perfect flat from our curated selection of premium
          properties.
        </Typography>
        <Box sx={{ marginTop: "50px" }}>
          <Grid container spacing={2} justifyContent="center">
            {data?.data &&
              data?.data?.slice(2, 8).map((flat: any, index: any) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  {" "}
                 
                  <FeatureFlatCard flat={flat} />
                </Grid>
              ))}
          </Grid>
          <Box mt={4} textAlign="center">
            <Button
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              See More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureFlatSection;
