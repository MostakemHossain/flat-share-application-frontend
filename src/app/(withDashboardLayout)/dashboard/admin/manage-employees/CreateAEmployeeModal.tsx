"use client";
import FlatMatchFileUploader from "@/components/Forms/FlatMatchFileUpload";
import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import FlatMatchModal from "@/components/Shared/FlatMatchModal.ts/FlatMatchModal";
import { useCreateEmployeeMutation } from "@/redux/api/employeeApi";
import { modifyPayload } from "@/utils/modifiedPayload";

import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAEmployeeModal = ({ open, setOpen }: TProps) => {
  const [createEmployee] = useCreateEmployeeMutation();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    setLoading(true);
    try {
      const res = await createEmployee(data).unwrap();
      if (res.id) {
        toast.success("Employee created successfully");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error("Failed to create employee: " + error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatMatchModal open={open} setOpen={setOpen} title="Create A New Employee">
      <FlatMatchForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FlatMatchInput name="name" label="Name" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="email" label="Email" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="contactNo" label="Contact Number" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="role" label="Role" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="facebookLink" label="Facebook Link" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="twitterLink" label="Twitter Link" />
          </Grid>
          <Grid item md={6}>
            <FlatMatchInput name="linkedinLink" label="LinkedIn Link" />
          </Grid>
          <Grid item md={6}>
            <Grid item md={6}>
              <FlatMatchFileUploader name="file" label="Upload File" />
            </Grid>
          </Grid>
        </Grid>
        <Button
          sx={{
            mt: 2,
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Employee"}
        </Button>
      </FlatMatchForm>
    </FlatMatchModal>
  );
};

export default CreateAEmployeeModal;
