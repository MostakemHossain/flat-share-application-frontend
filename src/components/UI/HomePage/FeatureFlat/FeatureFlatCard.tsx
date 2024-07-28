import { Bathtub, Bed, LocationOn, SquareFoot } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const FeatureFlatCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        overflow: "visible",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="data:image/jpeg;base64,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"
        alt="Flat image"
        sx={{
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Bluebell Real Estate
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
          $4,600 / Month
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={4} display="flex" alignItems="center">
            <Bed sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>3 Beds</Typography>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <Bathtub sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>3 Baths</Typography>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <SquareFoot sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>1200 sqft</Typography>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center">
            <LocationOn sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>778 Panama City, FL</Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#f83b02",
                boxShadow: 6,
              },
            }}
          >
            BOOK NOW
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureFlatCard;
