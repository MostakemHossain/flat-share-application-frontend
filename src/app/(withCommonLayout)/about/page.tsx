"use client";
import Team from "@/components/Team/page";
import { Box, Container, Grid, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsYXR8ZW58MHx8MHx8fDA%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          py: 16,
          textAlign: "center",
          color: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Typography
          variant="h3"
          sx={{ position: "relative", zIndex: 1, color: "#EC5312" }}
        >
          About
        </Typography>
      </Box>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color={"#EC5312"}
            >
              Who We Are
            </Typography>
            <Box
              sx={{
                width: "80px",
                height: "4px",
                backgroundColor: "secondary.main",
                mb: 3,
              }}
            />
            <Typography variant="body1" color="textSecondary" paragraph>
              FlatMatch is a leading platform for renting and selling flats,
              designed to simplify the process of finding the perfect living
              space. Combining modern design with user-friendly features, we
              offer an intuitive experience that makes it easy for both flat
              seekers and property owners.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Whether you are looking to rent a cozy apartment in the city or
              sell your property to potential buyers, FlatMatch ensures that you
              have access to a vast marketplace where quality and convenience
              meet. Our platform is built to cater to both renters and property
              managers with seamless navigation and features.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              From managing bookings and submitting rental applications to
              showcasing properties with ease, FlatMatch provides everything you
              need to make the process hassle-free. Our goal is to create a
              stress-free, efficient experience for everyone involved in the
              flat rental or selling process.
            </Typography>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsYXR8ZW58MHx8MHx8fDA%3D"
              alt="Real Estate Image"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Team />
    </Box>
  );
};

export default AboutUs;
