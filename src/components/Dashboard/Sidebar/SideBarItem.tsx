import { DrawerItem } from "@/types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type IProps = {
  item: DrawerItem;
};

const SideBarItem = ({ item }: IProps) => {
  const linkpath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={linkpath}>
      <ListItem disablePadding sx={{
        ...pathName===linkpath ?{borderRight:"3px solid #EC5312", "& svg":{
            color:"#EC5312"
        }}:{},
        mb:1
      }}>
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItem;
