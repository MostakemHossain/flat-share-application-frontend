import { Box, Container, Grid, Typography } from "@mui/material";
import HotFlatCard from "./HotFlatCard";

const HotFlat = () => {
  const flats = [1, 2, 3];

  return (
    <Container maxWidth="xl">
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
          marginTop: "50px",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {flats.map((flat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <HotFlatCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HotFlat;
