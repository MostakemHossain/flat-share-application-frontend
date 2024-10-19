import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import FlatMatchModal from "@/components/Shared/FlatMatchModal.ts/FlatMatchModal";
import {
  useGetASingleFlatQuery,
  useUpdateFlatMutation,
} from "@/redux/api/flat";
import { Box, Button, Grid, Modal, Skeleton } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  flatId?: string | null;
};

const UpdateFlatModal = ({ open, setOpen, flatId }: TProps) => {
  const handleClose = () => setOpen(false);

  // Ensure that the query is not made if `flatId` is invalid
  const { data, isLoading } = useGetASingleFlatQuery(flatId, {
    skip: !flatId, // Skip query if flatId is null or undefined
  });

  const [loading, setLoading] = useState(false);
  const [updateFlat] = useUpdateFlatMutation();

  // Handle the case when data is loading
  if (isLoading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Skeleton variant="text" width={210} />
          <Skeleton variant="text" width={210} />
          <Skeleton variant="text" width={210} />
        </Box>
      </Modal>
    );
  }

  const handleFormSubmit = async (values: FieldValues) => {
    const formattedValues = {
      ...values,
      squareFeet: parseInt(values.squareFeet, 10),
      totalBedrooms: parseInt(values.totalBedrooms, 10),
      totalRooms: parseInt(values.totalRooms, 10),
      rent: parseInt(values.rent, 10),
      advanceAmount: parseInt(values.advanceAmount, 10),
    };

    setLoading(true);
    try {
      const res = await updateFlat({
        id: flatId,
        data: formattedValues,
      }).unwrap();
      if (res.id) {
        toast.success("Flat updated successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to update flat");
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = {
    squareFeet: data?.squareFeet || 0,
    totalBedrooms: data?.totalBedrooms || 0,
    totalRooms: data?.totalRooms || 0,
    utilitiesDescription: data?.utilitiesDescription || "",
    location: data?.location || "",
    description: data?.description || "",
    rent: data?.rent || 0,
    advanceAmount: data?.advanceAmount || 0,
  };

  return (
    <>
      <FlatMatchModal open={open} setOpen={setOpen} title="Update A Flat">
        <FlatMatchForm
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
        >
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
          </Grid>
          <Button
            sx={{
              mt: 2,
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update A Flat"}{" "}
          </Button>
        </FlatMatchForm>
      </FlatMatchModal>
    </>
  );
};

export default UpdateFlatModal;
