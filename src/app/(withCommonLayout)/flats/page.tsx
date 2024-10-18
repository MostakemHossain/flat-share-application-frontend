"use client";
import FeatureFlatCard from "@/components/UI/HomePage/FeatureFlat/FeatureFlatCard";
import { useGetAllFlatQuery } from "@/redux/api/flat";
import { useDebounced } from "@/redux/hooks";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import loading from "../../../../public/an.json";

const AllFlats = () => {
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

  
  useEffect(() => {
    AOS.init({ duration: 1000,once:false }); 
  }, []);

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
        data-aos="fade-up" 
      >
        Explore Our Collection of Premium Flats
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
        data-aos="fade-up" 
      >
        Find your ideal flat among our carefully curated listings, located in
        the best neighborhoods. Each flat features comprehensive details to
        assist you in making an informed choice. Happy house hunting!
      </Typography>

      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
        data-aos="fade-up" 
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Flats"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: "100%", width: "100%" }}
        />
      </Box>

      <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
        <Grid container spacing={2} justifyContent="center">
          {data?.data &&
            data?.data?.map((flat: any, index: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={index}
                data-aos="fade-up" 
              >
                <FeatureFlatCard flat={flat} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AllFlats;
