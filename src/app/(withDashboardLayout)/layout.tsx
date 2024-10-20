"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.Service";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    router.push("/");
  }
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
