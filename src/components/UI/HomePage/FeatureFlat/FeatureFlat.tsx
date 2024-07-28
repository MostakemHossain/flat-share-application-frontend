import { Box, Button, Container, Grid, Typography } from "@mui/material";
import FeatureFlatCard from "./FeatureFlatCard";

const FeatureFlatSection = () => {
  const flats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="xl">
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
        <Box
          sx={{
            marginTop: "50px",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {flats.map((flat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureFlatCard />
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
