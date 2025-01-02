import { Medicine } from "../../types/types";

import {
  useState,
  Grid2,
  Card,
  CardContent,
  CardActions,
  DeleteIcon,
  UpdateMedicine,
  CustomPagination,
  Button,
  SearchBar,
  decodeToken,
  getMedicinesBySellerID,
  deleteMedicine,
  Alert,
  CircularProgress,
  React,
  Box,
  useEffect,
  Typography,
} from "../../../../../sharedimports/share";
const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(
    null
  );
  const [userID, setUserID] = useState<number>();
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserID(getdecodedToken.id);
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }
  }, [userID]);

  useEffect(() => {
    if (userID === undefined) return;

    const fetchMedicines = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMedicinesBySellerID(userID);
        console.log("Response Data:", response);

        if (response?.data?.length === 0) {
          setError("No medicines found for this seller.");
        } else {
          setMedicines(response?.data || []);
          setFilteredMedicines(response?.data || []);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching medicines.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [userID]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const filtered = medicines.filter(
      (medicine) =>
        medicine.medicineName.toLowerCase().includes(term) ||
        medicine.medicineCategory.toLowerCase().includes(term)
    );
    setFilteredMedicines(filtered);
  };

  const handleUpdateClick = (medicineID: number) => {
    setSelectedMedicineId(medicineID);
  };

  const handleDeleteClick = async (medicineID: number) => {
    setLoading(true);
    try {
      await deleteMedicine(medicineID);

      setMedicines((prevMedicines) => {
        const updatedMedicines = prevMedicines.filter(
          (medicine) => medicine.medicineID !== medicineID
        );
        setFilteredMedicines(updatedMedicines);
        return updatedMedicines;
      });

      alert("Medicine deleted successfully!");
    } catch (error) {
      alert("Failed to delete the medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentMedicines = filteredMedicines.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medicines List
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {loading && <CircularProgress size={50} />}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && filteredMedicines.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No medicines found.
        </Alert>
      )}

      {selectedMedicineId ? (
        <>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Update Medicine {selectedMedicineId}
          </Typography>
          <UpdateMedicine medicineId={selectedMedicineId} />
        </>
      ) : (
        <Box>
          <Grid2 container spacing={3}>
            {!loading &&
              !error &&
              currentMedicines.map((medicine) => (
                <Grid2 key={medicine.medicineID}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {medicine.medicineName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Category: {medicine.medicineCategory}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {medicine.medicineQuantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price per tablet: {medicine.priceofonemedicineinTablet}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Expiry Date: {medicine.medicineExpiryDate}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => handleUpdateClick(medicine.medicineID)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(medicine.medicineID)}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
          </Grid2>
          <Box paddingTop={1}>
            <CustomPagination
              totalItems={filteredMedicines.length}
              itemsPerPage={productsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MedicineList;
