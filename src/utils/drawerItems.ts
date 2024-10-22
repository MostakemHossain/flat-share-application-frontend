import { USER_ROLE } from "@/constants/role";
import { DrawerItem, userRole } from "@/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BackpackIcon from "@mui/icons-material/Backpack";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LockIcon from "@mui/icons-material/Lock";
import ReviewsIcon from "@mui/icons-material/Reviews";

export const drawerItems = (role: userRole) => {
  const roleMenus: DrawerItem[] = [];
  const defaultMenus = [
    {
      title: "Change Password",
      icon: LockIcon,
      path: `/change-password`,
    },
    {
      title: "Profile",
      icon: AccountCircleIcon,
      path: `${role}/profile`,
    },
  ];
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
          title: "Manage Bookings",
          icon: BackpackIcon,
          path: `${role}/all-bookings`,
        },
        {
          title: "Manage Users",
          icon: GroupIcon,
          path: `${role}/manage-users`,
        },
        {
          title: "Manage Employees",
          icon: HolidayVillageIcon,
          path: `${role}/manage-employees`,
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
          title: "Manage Bookings",
          icon: BackpackIcon,
          path: `${role}/all-bookings`,
        },
        {
          title: "Manage Users",
          icon: GroupIcon,
          path: `${role}/manage-users`,
        },
        {
          title: "Manage Employees",
          icon: HolidayVillageIcon,
          path: `${role}/manage-employees`,
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
  return [...roleMenus, ...defaultMenus];
};
