"use client";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useState } from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#ed5311",
      },
      secondary: {
        main: "#ec78f0",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            padding: "8px 24px",
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "lg",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default CommonLayout;
