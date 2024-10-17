// HotFlatCard.tsx
import { Bathtub, Bed, LocationOn, SquareFoot } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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

const HotFlatCard = ({ flat }: { flat: Flat }) => {
  return (
    <Card sx={{ width: "100%", maxWidth: 380, borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "primary.main",
            color: "white",
            padding: "2px 8px",
            borderRadius: "10px",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          Hot
        </Box>
        <CardMedia
          component="img"
          height="200"
          image={flat.photos[0]} // Use the first photo from the flat's data
          alt="Property"
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
            height: "300px",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "primary.main",
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "5px",
            marginBottom: "10px",
          }}
          color="textSecondary"
        >
          Rent
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {flat.location}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", marginTop: 1, marginLeft: 1 }}
          >
            ${flat.rent}
          </Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" mt={1}>
          <Bed sx={{ marginRight: 1, color: "slategray" }} />
          <Typography variant="body2">{flat.totalBedrooms} Beds</Typography>
          <Bathtub sx={{ marginRight: 1, marginLeft: 2, color: "slategray" }} />
          <Typography variant="body2">{flat.totalRooms} Baths</Typography>
          <SquareFoot
            sx={{ marginRight: 1, marginLeft: 2, color: "slategray" }}
          />
          <Typography variant="body2">{flat.squareFeet} sqft</Typography>
        </Box>
        <Box
          display="flex"
          sx={{
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Box display="flex" alignItems="center" mt={1}>
            <LocationOn
              sx={{ marginRight: 1, marginTop: "10px", color: "slategray" }}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                marginTop: "10px",
              }}
            >
              {flat.location}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, borderRadius: "20px" }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotFlatCard;
