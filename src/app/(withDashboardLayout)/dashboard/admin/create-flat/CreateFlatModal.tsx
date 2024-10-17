"use client";
import FlatMatchFileUploader from "@/components/Forms/FlatMatchFileUpload";
import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import FlatMatchModal from "@/components/Shared/FlatMatchModal.ts/FlatMatchModal";
import { useCreateFlatMutation } from "@/redux/api/flat";
import { modifyPayload } from "@/utils/modifiedPayload";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateFlatModal = ({ open, setOpen }: TProps) => {
  const [createFlat] = useCreateFlatMutation();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values: FieldValues) => {
    const parkingValue = values.parking === "available";

    const formattedValues = {
      ...values,
      parking: parkingValue,
      squareFeet: parseInt(values.squareFeet, 10),
      totalBedrooms: parseInt(values.totalBedrooms, 10),
      totalRooms: parseInt(values.totalRooms, 10),
      rent: parseInt(values.rent, 10),
      advanceAmount: parseInt(values.advanceAmount, 10),
    };
    const data = modifyPayload(formattedValues);

    setLoading(true);
    try {
      const res = await createFlat(data).unwrap();
      if (res.id) {
        toast.success("Create A New Flat Successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatMatchModal open={open} setOpen={setOpen} title="Create A New Flat">
      <FlatMatchForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FlatMatchInput name="squareFeet" label="Square Feet" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="totalBedrooms" label="Total Bedrooms" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="totalRooms" label="Total Rooms" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput
              name="utilitiesDescription"
              label="Utilities Description"
            />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="location" label="Location" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="description" label="Description" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="rent" label="Rent" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="advanceAmount" label="Advance Amount" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button
          sx={{
            mt: 2,
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create A Flat"}{" "}
        </Button>
      </FlatMatchForm>
    </FlatMatchModal>
  );
};

export default CreateFlatModal;
