import {
  useState,
  useQuery,
  getMedicines,
  Item,
  Cart,
  Drawer,
  LinearProgress,
  Badge,
  CustomPagination,
  Button,
  SearchBar,
  AddShoppingCartIcon,
  Alert,
  Box,
  useEffect,
} from "../../../../../sharedimports/share";
export type CartItemType = {
  medicineID: number;
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet?: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string;
  medicineManufacturingDate: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  try {
    return await getMedicines();
  } catch (error) {
    console.error("Error fetching products:", error);

    throw new Error("Failed to fetch products");
  }
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const [filteredMedicines, setFilteredMedicines] = useState<CartItemType[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    if (data) {
      setFilteredMedicines(data);
    }
  }, [data]);

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const filtered = data?.filter(
      (medicine) =>
        medicine.medicineName.toLowerCase().includes(term) ||
        medicine.medicineCategory.toLowerCase().includes(term)
    );
    setFilteredMedicines(filtered || []);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(
        (item) => item.medicineID === clickedItem.medicineID
      );
      const availableQuantity = clickedItem.medicineQuantity;
      let updatedAmount = 0;
      if (isItemInCart) {
        updatedAmount = isItemInCart.amount + 1;
        if (updatedAmount > availableQuantity) {
          alert(
            `You cannot add more than ${availableQuantity} of this medicine to the cart.`
          );
          return prev;
        }
        return prev.map((item) =>
          item.medicineID === clickedItem.medicineID
            ? { ...item, amount: updatedAmount }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.medicineID === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const currentMedicines = filteredMedicines.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Box>
      <Box>
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
      </Box>

      <Box>
        <Button onClick={() => setCartOpen(true)} variant="contained">
          <Badge
            badgeContent={getTotalItems(cartItems)}
            color="secondary"
            sx={{ marginRight: "10px" }}
          >
            <AddShoppingCartIcon />
          </Badge>
          Cart
        </Button>
      </Box>
      {!error && filteredMedicines.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No medicines found.
        </Alert>
      )}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        gap={3}
        marginTop={1}
      >
        {currentMedicines.length > 0 ? (
          currentMedicines.map((item) => (
            <Box key={item.medicineID}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Box>
          ))
        ) : (
          <div>No medicines found</div>
        )}
      </Box>

      <Box paddingTop={1}>
        <CustomPagination
          totalItems={filteredMedicines.length}
          itemsPerPage={productsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default App;
