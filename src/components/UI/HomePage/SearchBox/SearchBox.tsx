"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const SearchBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h3"
        component="h5"
        sx={{
          marginBottom: "10px",
          marginTop: "80px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Find Your Perfect Flat or Roommate
      </Typography>
      <Typography
        sx={{ marginBottom: "20px", textAlign: "center", color: "gray" }}
      >
        Search from a wide range of listings to find the ideal flat or roommate
        that matches your preferences. Start your journey with just a few
        clicks.
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter location, flat type, or roommate preferences..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default SearchBox;
