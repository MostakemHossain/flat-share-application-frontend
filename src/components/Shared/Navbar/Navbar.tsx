import { logoutUser } from "@/services/actions/logOut";
import { getUserInfo } from "@/services/auth.Service";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  const user = getUserInfo();
  const handleLogout = () => {
    logoutUser(router);
  };

  return (
    <Container maxWidth={"xl"}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: darkMode ? "white" : "black",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
            }}
          >
            Flat<Stack color={"primary.main"}>Match</Stack>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Link href={"/"}>
              <Typography
                variant="h6"
                sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#ed5311" } }}
              >
                Home
              </Typography>
            </Link>

            {user?.id && (
              <Link href={"/dashboard"}>
                <Typography
                  variant="h6"
                  sx={{
                    mx: 2,
                    fontWeight: 600,
                    "&:hover": { color: "#ed5311" },
                  }}
                >
                  Dashboard
                </Typography>
              </Link>
            )}
            <Link href={"/about"}>
              <Typography
                variant="h6"
                sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#ed5311" } }}
              >
                About Us
              </Typography>
            </Link>
            <Link href={"/flats"}>
              <Typography
                variant="h6"
                sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#ed5311" } }}
              >
                Flats
              </Typography>
            </Link>
            <Link href={"/contact"}>
              <Typography
                variant="h6"
                sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#ed5311" } }}
              >
                Contact Us
              </Typography>
            </Link>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {user?.id ? (
              <Button color="error" onClick={handleLogout}>
                LogOut
              </Button>
            ) : (
              <Button onClick={handleSignInOpen}>Login</Button>
            )}
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Stack>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{
                color: "#ed5311",
              }}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                  marginTop: "8px",
                },
              }}
            >
              <MenuItem
                sx={{ fontWeight: 600, "&:hover": { color: "#ed5311" } }}
                onClick={handleMenuClose}
              >
                <Link href={"/"}>Home</Link>
              </MenuItem>
              {/* Show Dashboard link only if user is logged in */}
              {user?.id && (
                <MenuItem
                  sx={{ fontWeight: 600, "&:hover": { color: "#ed5311" } }}
                  onClick={handleMenuClose}
                >
                  <Link href={"/dashboard"}>Dashboard</Link>
                </MenuItem>
              )}
              <MenuItem
                sx={{ fontWeight: 600, "&:hover": { color: "#ed5311" } }}
                onClick={handleMenuClose}
              >
                <Link href={"/about"}>About Us</Link>
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 600, "&:hover": { color: "#ed5311" } }}
                onClick={handleMenuClose}
              >
                <Link href={"/flats"}>Flats</Link>
              </MenuItem>
              <MenuItem
                sx={{ fontWeight: 600, "&:hover": { color: "#ed5311" } }}
                onClick={handleMenuClose}
              >
                <Link href={"/contact"}>Contact Us</Link>
              </MenuItem>
              <MenuItem>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Switch checked={darkMode} onChange={toggleDarkMode} />
                </Stack>
              </MenuItem>
              <MenuItem>
                {user?.id ? (
                  <Button color="error" onClick={handleLogout}>
                    LogOut
                  </Button>
                ) : (
                  <Button onClick={handleSignInOpen}>Login</Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <SignInModal
        open={isSignInOpen}
        onClose={handleSignInClose}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpModal
        open={isSignUpOpen}
        onClose={handleSignUpClose}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </Container>
  );
};

export default Navbar;
