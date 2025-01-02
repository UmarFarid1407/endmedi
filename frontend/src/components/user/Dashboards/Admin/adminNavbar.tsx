import { Navigation, Router } from "@toolpad/core/AppProvider";

import {
  ResponsiveAdminAppBar,
  DescriptionIcon,
  MedicinesTable,
  UsersList,
  React,
  Profile,
  AppProvider,
  PharmacistData,
  DashboardLayout,
  PageContainer,
  extendTheme,
  UserData,
  Box,
  Typography,
} from "../../../../sharedimports/share";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "All Users",
    icon: <PersonIcon />,
  },

  {
    kind: "divider",
  },

  {
    segment: "seller",
    title: "Seller",
    icon: <AddHomeWorkIcon />,
  },
  {
    segment: "user",
    title: "User",
    icon: <DescriptionIcon />,
  },
  {
    segment: "pharmacists",
    title: "Pharmacists",
    icon: <ShoppingBasketIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountBoxIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function AdminNavbar(props: any) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case "/dashboard":
        return <UsersList />;
      case "/seller":
        return <MedicinesTable />;
      case "/pharmacists":
        return <PharmacistData />;
      case "/user":
        return <UserData />;

      case "/profile":
        return <Profile />;

      default:
        return <Typography variant="h5">Page not found</Typography>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Box>
          <ResponsiveAdminAppBar />
        </Box>

        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
