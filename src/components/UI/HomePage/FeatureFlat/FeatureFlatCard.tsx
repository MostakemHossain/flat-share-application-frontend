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
import Link from "next/link";

export interface Flat {
  id: string;
  squareFeet: number;
  userId: string;
  totalBedrooms: number;
  totalRooms: number;
  utilitiesDescription: string;
  location: string;
  description: string;
  photos: string[];
  rent: number;
  parking: boolean;
  availability: boolean;
  advanceAmount: number;
  createdAt: string;
  updatedAt: string;
}

const FeatureFlatCard = ({ flat }: { flat: Flat }) => {
  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: 345 },
        borderRadius: 5,
        boxShadow: 3,
        transition: "transform 0.5s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={flat.photos[0]}
        alt="Property"
        sx={{
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
          height: "200px",
          borderRadius: 3,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: { xs: "1rem", md: "1.25rem" } }} // Responsive font size
        >
          {`${flat.location?.slice(0, 18) || "Bluebell Real Estate".slice(0, 18)}${flat.location?.length > 20 ? "..." : ""}`}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
          ${flat.rent.toLocaleString()} / Month
        </Typography>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={4} display="flex" alignItems="center">
            <Bed sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>{flat.totalBedrooms} Beds</Typography>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <Bathtub sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>{flat.totalRooms} Baths</Typography>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center">
            <SquareFoot sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>{flat.squareFeet} sqft</Typography>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center">
            <LocationOn sx={{ color: "#ff5722", fontSize: 20 }} />
            <Typography ml={1}>{flat.location}</Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Link href={`/flats/${flat.id}`}>
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
              VIEW DETAILS
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureFlatCard;
