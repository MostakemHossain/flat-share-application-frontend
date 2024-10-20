import FlatMatchFileUploader from "@/components/Forms/FlatMatchFileUpload";
import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import FlatMatchModal from "@/components/Shared/FlatMatchModal.ts/FlatMatchModal";
import {
  useGetASingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/redux/api/employeeApi";
import { modifyPayload } from "@/utils/modifiedPayload";
import { Box, Button, Grid, Modal, Skeleton } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeId?: string | null;
};

const UpdateEmployeeModal = ({ open, setOpen, employeeId }: TProps) => {
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetASingleEmployeeQuery(employeeId, {
    skip: !employeeId,
  });

  const [loading, setLoading] = useState(false);
  const [updateEmployee] = useUpdateEmployeeMutation();

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

  // Default values based on fetched employee data
  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    contactNo: data?.contactNo || "",
    role: data?.role || "",
    facebookLink: data?.facebookLink || "",
    twitterLink: data?.twitterLink || "",
    linkedinLink: data?.linkedinLink || "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    const modifiedData = modifyPayload(values);

    setLoading(true);
    try {
      const res = await updateEmployee({
        id: employeeId,
        data: modifiedData,
      }).unwrap();
      if (res.id) {
        toast.success("Employee updated successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to update Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FlatMatchModal open={open} setOpen={setOpen} title="Update Employee">
        <FlatMatchForm
          onSubmit={handleFormSubmit}
          defaultValues={defaultValues}
        >
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
           
          </Grid>
          <Button
            sx={{
              mt: 2,
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Employee"}
          </Button>
        </FlatMatchForm>
      </FlatMatchModal>
    </>
  );
};

export default UpdateEmployeeModal;
