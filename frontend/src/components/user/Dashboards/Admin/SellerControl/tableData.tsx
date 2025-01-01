import SearchableSellerTable from "./sellerTable"; // Ensure the path is correct
import { useFetchData } from "../fetchdata";

import {
  getMedicines,
  CircularProgress,
  Box,
} from "../../../../../sharedimports/share";
export default function SellerData() {
  const { data: medicines, loading, error } = useFetchData(getMedicines);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ width: "100%" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <SearchableSellerTable data={medicines || []} loading={loading} />;
}
