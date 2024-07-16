import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bgcolor="rgb(12, 20, 27)" py={5}>
      <Container maxWidth={"xl"}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography
              color="#fff"
              variant="h4"
              component={Link}
              href="/"
              fontWeight={600}
            >
              <Box component="span" color="primary.main">
                F
              </Box>
              lat
              <Box component="span" color="primary.main">
                M
              </Box>
              atch
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              12 Main St. London
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              +44 3656 4567
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              flatmatch321@gmail.com
            </Typography>
            <Stack direction="row" gap={2} justifyContent="center" py={3}>
              <Link href="https://facebook.com" target="_blank" rel="noopener">
                <FacebookIcon style={{ color: "#fff", fontSize: 30 }} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener">
                <TwitterIcon style={{ color: "#fff", fontSize: 30 }} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener">
                <LinkedInIcon style={{ color: "#fff", fontSize: 30 }} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener">
                <InstagramIcon style={{ color: "#fff", fontSize: 30 }} />
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h5">
              About Us
            </Typography>
            <Link href="#" color="#fff" py={1} display="block">
              Our Story
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              How It Works
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Meet the Team
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Testimonials
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Careers
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h5">
              Support
            </Typography>
            <Link href="#" color="#fff" py={1} display="block">
              FAQ
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Customer Service
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Contact Us
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Safety Tips
            </Link>
            <Link href="#" color="#fff" py={1} display="block">
              Help Center
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h5">
              Pay Safely With Us
            </Typography>
            <Typography py={2} color="#fff">
              The payment is encrypted and transmitted securely with an SSL
              protocol.
            </Typography>
            <Link href="#" color="#fff" display="block" variant="h6">
              Privacy Policy
            </Link>
            <Link href="#" color="#fff" display="block" variant="h6">
              Terms & Conditions
            </Link>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            borderTop: "1px dashed lightgray",
          }}
        >
          <Typography py={1} variant="h5" color="#fff">
            © {currentYear} FlatMatch. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
