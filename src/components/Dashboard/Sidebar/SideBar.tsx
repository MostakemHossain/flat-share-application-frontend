import { getUserInfo } from "@/services/auth.Service";
import { userRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "next/link";
import { useEffect, useState } from "react";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="h4"
          fontWeight={700}
          marginTop={"15px"}
          component={Link}
          href={"/"}
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "flex" },
          }}
        >
          Flat<Stack color={"primary.main"}>Match</Stack>
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as userRole).map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
