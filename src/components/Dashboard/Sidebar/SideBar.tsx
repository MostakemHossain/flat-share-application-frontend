import { userRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  
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
        {drawerItems("admin" as userRole).map((item, index) => (
          <SideBarItem key={index}  item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
