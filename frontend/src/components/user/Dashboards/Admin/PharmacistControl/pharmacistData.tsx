import SearchableTable from "./pharmacistTable";
import { useFetchData } from "../fetchdata";
import {
  getAllPharmacyCarts,
  React,
  CircularProgress,
  Box,
} from "../../../../../sharedimports/share";

interface PharmacistDataProps {}

const PharmacistData: React.FC<PharmacistDataProps> = (props) => {
  const {
    data: pharmacyCarts,
    loading,
    error,
  } = useFetchData(getAllPharmacyCarts);

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

  return <SearchableTable data={pharmacyCarts || []} loading={loading} />;
};

export default PharmacistData;
