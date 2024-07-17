"use client";
import { ThemeProvider } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { theme } from "../theme/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
