"use client";
import FlatMatchFileUploader from "@/components/Forms/FlatMatchFileUpload";
import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import FlatMatchModal from "@/components/Shared/FlatMatchModal.ts/FlatMatchModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateFlatModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = (values: FieldValues) => {};
  return (
    <FlatMatchModal open={open} setOpen={setOpen} title="Create A New Flat">
      <FlatMatchForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FlatMatchInput name="Square Feet" label="Square Feet" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchFileUploader name="file" label="Upload File"/>
          </Grid>
        </Grid>
        <Button sx={{
            mt:2
        }} type="submit">Create A Flat</Button>
      </FlatMatchForm>
    </FlatMatchModal>
  );
};

export default CreateFlatModal;
