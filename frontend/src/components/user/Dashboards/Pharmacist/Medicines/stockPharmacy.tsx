import { CartItem } from "../../types/types";

import {
  useState,
  getCartByPharmacistID,
  removeCartByPharmacistCartID,
  React,
  decodeToken,
  CustomPagination,
  Button,
  Typography,
  Grid2,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Alert,
  Box,
  useEffect,
} from "../../../../../sharedimports/share";
const StockPharmacy: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [categoryCounts, setCategoryCounts] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCartData, setFilteredCartData] = useState<CartItem[]>([]);
  const [userID, setUserID] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
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

    const fetchCartData = async () => {
      setLoading(true);
      try {
        const data = await getCartByPharmacistID(userID);
        console.log(data);
        setCartData(data);
        setFilteredCartData(data);
        updateCategoryCounts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userID]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateCategoryCounts = (data: CartItem[]) => {
    const categoryMap: any = {};
    data.forEach((item: CartItem) => {
      if (categoryMap[item.medicineCategory]) {
        categoryMap[item.medicineCategory] += 1;
      } else {
        categoryMap[item.medicineCategory] = 1;
      }
    });
    setCategoryCounts(categoryMap);
  };

  const calculateTotal = (data: CartItem[]) => {
    let totalMedicines = 0;
    let totalAmount = 0;

    const successfulPayments = data.filter(
      (item) => item.paymentStatus === "success"
    );

    successfulPayments.forEach((item: CartItem) => {
      totalMedicines += item.medicineQuantity;
      totalAmount += item.amount * item.priceofonemedicineinTablet;
    });

    return { totalMedicines, totalAmount };
  };

  const handleDeleteClick = async (removeID: number) => {
    try {
      await removeCartByPharmacistCartID(removeID);
      const updatedCartData = cartData.filter((item) => item.id !== removeID);
      setCartData(updatedCartData);
      setFilteredCartData(updatedCartData);
      updateCategoryCounts(updatedCartData);

      alert("Medicine deleted successfully!");
    } catch (error) {
      alert("Failed to delete the medicine. Please try again.");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = cartData.filter(
      (item) =>
        item.medicineName.toLowerCase().includes(searchTerm) ||
        item.medicineCategory.toLowerCase().includes(searchTerm)
    );

    setFilteredCartData(filteredData);
  };
  const currentMedicines = filteredCartData.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const { totalMedicines, totalAmount } = calculateTotal(cartData);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Stock Pharmacy - Cart Details
      </Typography>

      <TextField
        label="Search Medicine"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 3 }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {cartData.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No medicines in stock.
            </Typography>
          ) : (
            <>
              <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Total Purchased Medicines: {totalMedicines}
                </Typography>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Total Purchased Amount: ${totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  Medicine Categories and Count:
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                  gap={3}
                >
                  {Object.keys(categoryCounts).map((category, index) => (
                    <Box key={index}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            gutterBottom
                          >
                            {category}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Total Medicines: {categoryCounts[category]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
                gap={3}
              >
                {currentMedicines.length > 0 ? (
                  currentMedicines.map((item, index) => (
                    <Box key={index}>
                      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="textPrimary"
                            gutterBottom
                          >
                            {item.medicineName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Category: {item.medicineCategory}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Quantity: {item.medicineQuantity}{" "}
                            {item.medicinequantityinonetablet &&
                              `(${item.medicinequantityinonetablet} per tablet)`}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Price per tablet: $
                            {item.priceofonemedicineinTablet.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Total Amount: ${" "}
                            {(
                              item.amount * item.priceofonemedicineinTablet
                            ).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            Order Payment Status: ${item.paymentStatus}
                          </Typography>
                          <Button
                            size="small"
                            color="warning"
                            variant="contained"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            Remove From Stock
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <Grid2>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      No items found based on your search.
                    </Typography>
                  </Grid2>
                )}

                <Box paddingTop={1}>
                  <CustomPagination
                    totalItems={filteredCartData.length}
                    itemsPerPage={productsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default StockPharmacy;
