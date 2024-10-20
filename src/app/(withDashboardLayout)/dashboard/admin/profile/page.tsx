"use client";
import FlatMatchFileUploader from "@/components/Forms/FlatMatchFileUpload";
import FlatMatchForm from "@/components/Forms/FlatMatchForm";
import FlatMatchInput from "@/components/Forms/FlatMatchInput";
import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifiedPayload";
import { Edit, Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
  address: string;
  gender: string;
  photo: string;
  bio?: string;
}

const MyProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userProfile: UserProfile = {
    name: data?.fullName || "John Doe",
    email: data?.email || "john.doe@example.com",
    phone: data?.phone || "+1234567890",
    role: data?.role?.toLowerCase() || "user",
    address: data?.address || "123 Main St, Anytown, USA",
    gender: data?.gender || "Male",
    photo: data?.profilePhoto || "https://via.placeholder.com/150",
    bio: data?.bio || "This is a short bio about John Doe.",
  };

  const showModal = () => {
    setIsModalVisible(true);
    setFileList(null);
    setPreviewImage(userProfile.photo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formValues = modifyPayload(data);
    setLoading(true);
    try {
      const res = await updateMyProfile(formValues).unwrap();
      if (res.id) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error("Failed to update profile", {
        className: "custom-toast",
      });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileList(files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        <Box width="100%" borderRadius={3} p={3}>
          <Grid spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                sx={{ width: 300, height: 300 }}
                src={userProfile.photo}
                alt={userProfile.name}
              />
              <Typography variant="h5" mt={2}>
                {userProfile.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Email:{" "}
                <span style={{ color: "#EA580B" }}>{userProfile.email}</span>
              </Typography>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  aria-label="facebook"
                  sx={{ bgcolor: "#4267B2", color: "white" }}
                >
                  <Facebook />
                </Button>
                <Button
                  aria-label="twitter"
                  sx={{ bgcolor: "#1DA1F2", color: "white" }}
                >
                  <Twitter />
                </Button>
                <Button
                  aria-label="linkedin"
                  sx={{ bgcolor: "#0077B5", color: "white" }}
                >
                  <LinkedIn />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h6">Phone: {userProfile.phone}</Typography>
                <Typography variant="h6">
                  Role:{" "}
                  <span
                    style={{
                      color:
                        userProfile.role === "admin"
                          ? "red"
                          : userProfile.role === "super-admin"
                            ? "orange"
                            : "green",
                    }}
                  >
                    {userProfile.role.toUpperCase()}
                  </span>
                </Typography>
                
               
                <Typography variant="h6">
                  Address: {userProfile.address}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Bio: {userProfile.bio}
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={showModal}
                  sx={{ mt: 3, bgcolor: "#EA580B", color: "white" }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Edit Profile Modal */}
      <Dialog
        open={isModalVisible}
        onClose={handleCancel}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <FlatMatchForm onSubmit={onSubmit} defaultValues={userProfile}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FlatMatchInput name="name" label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FlatMatchInput name="phone" label="Phone" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FlatMatchInput name="address" label="Address" fullWidth />
              </Grid>
              
              <Grid item xs={12}>
                <FlatMatchInput name="bio" label="Bio" fullWidth />
              </Grid>
              <Grid item md={6}>
                <FlatMatchFileUploader name="file" label="Upload File" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </DialogActions>
        </FlatMatchForm>
      </Dialog>
    </>
  );
};

export default MyProfile;
