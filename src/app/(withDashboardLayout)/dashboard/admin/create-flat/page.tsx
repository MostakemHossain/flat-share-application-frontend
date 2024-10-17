"use client";
import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import CreateFlatModal from "./CreateFlatModal";

const CreateFlat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(""); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Create A New Flat
          </Button>
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="flex-end">
          <TextField
            variant="outlined"
            placeholder="Search Flats..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "100%",
              maxWidth: "300px", 
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
      </Grid>
      <CreateFlatModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default CreateFlat;
