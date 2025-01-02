import { Navigation, Router } from "@toolpad/core/AppProvider";

import {
  ResponsiveAdminAppBar,
  StockPurchasedFromPharmacy,
  MedicineList,
  CreateMedicine,
  Profile,
  AppProvider,
  DashboardLayout,
  PageContainer,
  extendTheme,
  useState,
  useMemo,
  Box,
  Typography,
} from "../../../../sharedimports/share";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Seller",
    icon: <SupervisedUserCircleIcon />,
  },
  {
    segment: "add-medicine",
    title: "Add Medicine",
    icon: <ShoppingCartIcon />,
  },

  {
    segment: "profile",
    title: "Profile",
    icon: <AccountBoxIcon />,
  },
  {
    segment: "show-medicine",
    title: "Show Medicine",
    icon: <InventoryIcon />,
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
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function SellerNavbar(props: any) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case "/dashboard":
        return <StockPurchasedFromPharmacy />;
      case "/add-medicine":
        return <CreateMedicine />;
      case "/show-medicine":
        return <MedicineList />;
      case "/profile":
        return <Profile />;
      default:
        return <Typography variant="h5">Page not found</Typography>;
    }
  };

  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <Box>
          <DashboardLayout>
            <Box>
              <ResponsiveAdminAppBar />
            </Box>

            <PageContainer>{renderContent()}</PageContainer>
          </DashboardLayout>
        </Box>
      </AppProvider>
    </>
  );
}
