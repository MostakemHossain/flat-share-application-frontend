import { USER_ROLE } from "@/constants/role";
import { DrawerItem, userRole } from "@/types";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";

export const drawerItems = (role: userRole) => {
  const roleMenus: DrawerItem[] = [];
  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          icon: DashboardIcon,
          path: `${role}`,
        },
        {
          title: "Create Flat",
          icon: ApartmentIcon,
          path: `${role}/create-flat`,
        },
        {
          title: "Manage Users",
          icon: GroupIcon,
          path: `${role}/manage-users`,
        },
        {
          title: "Contacts",
          icon: ContactMailIcon,
          path: `${role}/contacts`,
        },
        {
          title: "All Reviews",
          icon: ReviewsIcon,
          path: `${role}/reviews`,
        }
      );
      break;
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          icon: DashboardIcon,
          path: `${role}`,
        },
        {
          title: "Create Flat",
          icon: ApartmentIcon,
          path: `${role}/create-flat`,
        },
        {
          title: "Manage Users",
          icon: GroupIcon,
          path: `${role}/manage-users`,
        },
        {
          title: "Contacts",
          icon: ContactMailIcon,
          path: `${role}/contacts`,
        },
        {
          title: "All Reviews",
          icon: ReviewsIcon,
          path: `${role}/reviews`,
        }
      );
      break;
    case USER_ROLE.USER:
      roleMenus.push(
        {
          title: "Dashboard",
          icon: DashboardIcon,
          path: `${role}`,
        },
        {
          title: "My Bookings",
          icon: BookOnlineIcon,
          path: `${role}/my-bookings`,
        },
        {
          title: "Reviews",
          icon: ReviewsIcon,
          path: `${role}/my-reviews`,
        }
      );
      break;
  }
  return [...roleMenus];
};