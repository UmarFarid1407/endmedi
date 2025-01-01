import { Navigation, Router } from "@toolpad/core/AppProvider";

import {
  StockPharmacy,
  AllMedicines,
  SearchableTable,
  ResponsiveAdminAppBar,
  React,
  Profile,
  AppProvider,
  DashboardLayout,
  PageContainer,
  extendTheme,
  Box,
  Typography,

} from "../../../../sharedimports/share";
import   AccountBoxIcon from '@mui/icons-material/AccountBox';
import  InventoryIcon from '@mui/icons-material/Inventory';
import  ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
const NAVIGATION: Navigation = [
  
  
  {
    segment: "dashboard",
    title: " Pharmacy",
    icon: <VerifiedUserIcon />,
  },
  {
    segment: "stock-pharmacy",
    title: "Stock Pharmacy",
    icon: <InventoryIcon />,
  },
  {
    segment: "purchase-medicine",
    title: "Purchase Medicine",
    icon: <ShoppingCartIcon />,
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

export default function PharmacistNavbar(props: any) {
  const { window } = props;
 
  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;

  const renderContent = () => {
    switch (router.pathname) {
      case "/dashboard":
        return <SearchableTable />;
      case "/stock-pharmacy":
        return <StockPharmacy />;
      case "/purchase-medicine":
        return <AllMedicines />;
      case "/profile":
        return <Profile />;
      default:
        return <Typography variant="h5">Page not found</Typography>;
    }
  };

  return (
    <Box>
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
    </Box>
  );
}
