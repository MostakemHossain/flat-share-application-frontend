"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "20px 10px", md: "50px 20px", lg: "50px" },
          //   background: "linear-gradient(to right, #5a565261 0%, #e6e19f 100%)",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight={600}
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                data-aos="fade-right"
              >
                Discover Your Dream...
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                color="secondary"
                gutterBottom
                fontWeight={600}
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
                data-aos="fade-left"
                data-aos-delay="200"
              >
                Connect with Compatible Roommates and{" "}
                <span style={{ color: "#ff5722" }}>
                  Enjoy Comfortable Living
                </span>
                !
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                component="p"
                gutterBottom
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" } }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Join our community and find the ideal flatmate to share your
                living space. Enjoy a hassle-free search and seamless move-in
                process with curated matches designed for you. Start your
                journey to finding the perfect living situation today...!
              </Typography>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  gap: { xs: 2, sm: 0 },
                }}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: { sm: "0 10px 0 0" } }}
                >
                  Find a Flat
                </Button>
                <Link href="/tour-page">
                  <Button
                    variant="outlined"
                    sx={{
                      margin: { sm: "0 0 0 10px" },
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    Browse Listings
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "100%", md: "500px" },
                margin: { xs: "20px auto", md: "0 auto" },
                height: { xs: "auto", md: "100%" },
              }}
            >
              <Box
                component="img"
                src="https://media.istockphoto.com/id/516264474/photo/public-housing-in-bishan-singapore.webp?b=1&s=170667a&w=0&k=20&c=awroAX6XzJoTpk0FFLkFIRYP2__Mp1rGSzMmYjQHJCE="
                alt="Main Building"
                data-aos="fade-up"
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  position: { xs: "relative", md: "absolute" },
                  top: { xs: "auto", md: "-400px" },
                  right: { xs: "auto", md: "100px" },
                  marginBottom: { xs: 2, md: 0 },
                }}
              />
              <Box
                component="img"
                src="https://tds-images.thedailystar.net/upload/gallery/image/arts/purchasing-your-flat.jpg"
                alt="Travel"
                data-aos="fade-left"
                sx={{
                  position: "absolute",
                  width: { xs: "80px", sm: "120px", md: "320px" },
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  top: { xs: "auto", md: "-140px" },
                  right: { xs: "auto", md: "-70px" },
                  marginTop: { xs: 1, md: 0 },
                  display: { xs: "none", md: "block" },
                }}
              />
              <Box
                component="img"
                src="https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2024/05/74f75-diffrence-between-a-flat-and-an-apartmetn.jpg?fit=1000%2C667&ssl=1"
                alt="Travel"
                data-aos="fade-right"
                sx={{
                  position: "absolute",
                  width: { xs: "180px", sm: "120px", md: "320px" },
                  height: { xs: "auto", md: "300px" },
                  borderRadius: "20px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  top: { xs: "auto", md: "-40px" },
                  right: { xs: "auto", md: "270px" },
                  marginTop: { xs: 1, md: 0 },
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              x: [0, 100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid #ff5722",
              boxSizing: "border-box",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              x: [0, -100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              position: "absolute",
              bottom: "10%",
              right: "10%",
              width: "150px",
              height: "150px",
              background: "linear-gradient(135deg, #ff5722 0%, #e6e19f 100%)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
