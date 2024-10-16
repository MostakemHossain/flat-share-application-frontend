"use client";
import { Box, Button } from "@mui/material";
import React from "react";
import CreateFlatModal from "./CreateFlatModal";

const CreateFlat = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Speciality</Button>
      <CreateFlatModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default CreateFlat;
