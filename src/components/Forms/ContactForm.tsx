"use client";

import { useCreateContactMutation } from "@/redux/api/contactApi";
import { Box, Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type FormValues = {
  name: string;
  email: string;
  subject: string;
  contactNo: string;
  message: string;
};

const ContactForm = () => {
  const [createContact] = useCreateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await createContact(values).unwrap();
      if (res.id) {
        toast.success("Message sent successfully");
        reset(); 
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <Box
      sx={{
        px: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} my={1}>
          <Grid item md={6}>
            <TextField
              label="Your Name"
              type="text"
              variant="outlined"
              size="small"
              fullWidth={true}
              {...register("name")}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Your Email"
              type="email"
              variant="outlined"
              size="small"
              fullWidth={true}
              {...register("email")}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Your Subject"
              type="text"
              variant="outlined"
              size="small"
              fullWidth={true}
              {...register("subject")}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Your Phone Number"
              type="number"
              variant="outlined"
              size="small"
              fullWidth={true}
              {...register("contactNo")}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Your Message"
              type="text"
              variant="outlined"
              size="medium"
              fullWidth={true}
              {...register("message")}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            margin: "10px 0px",
          }}
          type="submit"
        >
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
