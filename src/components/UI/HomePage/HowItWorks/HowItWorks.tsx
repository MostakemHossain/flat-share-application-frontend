// components/HowItWorks.js
import { AssignmentTurnedIn, Group, LocationOn } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const steps = [
  {
    icon: <LocationOn color="primary" fontSize="large" />,
    title: "Evaluate Property",
    description:
      "Assess the property's condition and market value to ensure it meets your investment criteria.",
  },
  {
    icon: <Group color="primary" fontSize="large" />,
    title: "Meet Your Agent",
    description:
      "Connect with a licensed real estate agent who can guide you through the buying process.",
  },
  {
    icon: <AssignmentTurnedIn color="primary" fontSize="large" />,
    title: "Close The Deal",
    description:
      "Finalize the transaction with confidence and secure your new property with ease.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center", marginTop: "130px" }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        How It Works?
      </Typography>
      <Typography
        sx={{
          marginBottom: "30px",
        }}
        variant="subtitle1"
        gutterBottom
      >
        Learn how the process works in three simple steps...
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  height: "100%",
                  padding: 4,
                  position: "relative",
                  border: "1px solid #e0e0e0",
                  borderTopRightRadius: 50,
                  borderBottomLeftRadius: 50,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: 2,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontWeight: 700,
                    color: "primary.main",
                    width: 24,
                    height: 24,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.875rem",
                  }}
                >
                  {index + 1}
                </Box>
              </Card>
            </Grid>
            {index < steps.length - 1 && (
              <Grid item xs={12} md={1} sx={{ textAlign: "center" }}>
                <ArrowForwardIcon
                  sx={{
                    fontSize: "50px",
                  }}
                  color="primary"
                />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
