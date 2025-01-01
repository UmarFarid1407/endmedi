import {
  Box,
  Button,
  React,
  useState,
  useEffect,
  useNavigation,
  CircularProgress,
  getAllPharmacyCartsNotSignin,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Alert,
} from "../../../../../sharedimports/share";
import { Product } from "../../types/types";

const defaultImage =
  "https://img.freepik.com/free-photo/woman-s-hand-pours-medicine-pills-out-bottle_1150-14200.jpg?semt=ais_hybrid";

const ProductShow: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, seterror] = useState<any>();
  const productsPerPage = 4;
  const { navigateToProducts } = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data: Product[] = await getAllPharmacyCartsNotSignin();
        setProducts(data);
      } catch (error) {
        seterror(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleProducts = () => {
    navigateToProducts();
  };

  return (
    <Box border="1px solid #ddd" bgcolor="#f7f7f7" p={2} borderRadius={2}>
      <Typography variant="h5" mb={2} textAlign="center" pt={1}>
        Products
      </Typography>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-evenly"
            gap={2}
            sx={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {currentProducts.map((product) => (
              <Card key={product.id} sx={{ maxWidth: 345, minWidth: 250 }}>
                <CardActionArea onClick={() => handleProducts()}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={defaultImage}
                    alt={product.medicineName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.medicineName || "Unnamed Medicine"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.medicineCategory || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.priceofonemedicineinTablet || "N/A"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductShow;
