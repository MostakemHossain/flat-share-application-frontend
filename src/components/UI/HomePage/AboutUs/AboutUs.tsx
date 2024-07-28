import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DiscountIcon from "@mui/icons-material/LocalOffer";
import SupportIcon from "@mui/icons-material/Support";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  Typography,
} from "@mui/material";

const features = [
  {
    icon: <SupportIcon fontSize="large" />,
    title: "Premium Support",
    description:
      "We provide 24/7 premium support to ensure your living experience is seamless and enjoyable.",
  },
  {
    icon: <UpdateIcon fontSize="large" />,
    title: "Regular Updates",
    description:
      "Stay informed with regular updates on your application status, new listings, and community news.",
  },
  {
    icon: <CheckCircleIcon fontSize="large" />,
    title: "Guaranteed Services",
    description:
      "Our services are backed by a satisfaction guarantee to ensure your peace of mind and comfort.",
  },
  {
    icon: <DiscountIcon fontSize="large" />,
    title: "Member Discounts",
    description:
      "Enjoy exclusive discounts on local services and amenities as a valued member of our community.",
  },
];

const AboutSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ed5311",
        py: { xs: 10, lg: 20 },
        mt: { xs: 10, lg: 20 },
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ p: 4 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Connecting Flatmates and Rental Spaces Effortlessly.
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary"
                  gutterBottom
                >
                  TRUSTED BY 10K+ USERS
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Our platform simplifies the process of finding the perfect
                  flatmate or rental space. Join thousands of satisfied users
                  who have found their ideal living arrangements through us.
                </Typography>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} color={"#fff"} fontWeight={700}>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box display="flex" alignItems="flex-start">
                    <Box marginRight={2}>{feature.icon}</Box>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
