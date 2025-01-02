import {
  useState,
  TextField,
  styled,
  FormLabel,
  createMedicine,
  CreateIcon,
  Button,
  decodeToken,
  Alert,
  CircularProgress,
  React,
  Box,
  useEffect,
  Typography,
} from "../../../../../sharedimports/share";
import { MedicineFormCreateData } from "../../types/types";

const CreateMedicine: React.FC = () => {

  const [formData, setFormData] = useState<MedicineFormCreateData>({
    medicineName: "",
    medicineQuantity: 0,
    medicineCategory: "",
    priceofonemedicineinTablet: 0,
    medicinequantityinonetablet: 0,
    mediciinemadeIN: "",
    medicineExpiryDate: "",
    sellerID: 0,
    medicineManufacturingDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<number>(0);
  const [focusedField, setFocusedField] = React.useState("");
  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserId(getdecodedToken.id);
      setFormData((prevData) => ({
        ...prevData,
        sellerID: getdecodedToken.id,
      }));
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }
  }, [userId]);

  console.log("userid", userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: [
        "medicineQuantity",
        "priceofonemedicineinTablet",
        "sellerID",
      ].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await createMedicine(formData);
      setMessage(response.message || "Medicine created successfully!");

      setFormData({
        medicineName: "",
        medicineQuantity: 0,
        medicineCategory: "",
        priceofonemedicineinTablet: 0,
        medicinequantityinonetablet: 0,
        mediciinemadeIN: "",
        medicineExpiryDate: "",
        sellerID: userId,
        medicineManufacturingDate: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const StyledFormLabel = styled(FormLabel)(({ theme, focused }) => ({
    color: focused ? theme.palette.primary.main : theme.palette.text.primary,
    transition: "color 0.3s",
  }));
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        borderRadius={2}
        sx={{
          flex: 1,
          border: "1px solid lightgray",
          padding: 2,
          fontStyle: "italic",
        }}
      >
        Create Medicine
      </Typography>

      <Box
        sx={{
          maxWidth: 600,
          borderRadius: 2,
          bgcolor: "whitesmoke",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                xl: "row",
                lg: "row",
              },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicineName"
                focused={focusedField === "medicineName"}
              >
                Medicine Name
              </StyledFormLabel>
              <TextField
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                fullWidth
                required
                onFocus={() => setFocusedField("medicineName")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicineQuantity"
                focused={focusedField === "medicineQuantity"}
              >
                Medicine Quantity
              </StyledFormLabel>
              <TextField
                name="medicineQuantity"
                type="number"
                value={formData.medicineQuantity}
                onChange={handleChange}
                fullWidth
                required
                onFocus={() => setFocusedField("medicineQuantity")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                xl: "row",
                lg: "row",
              },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicineCategory"
                focused={focusedField === "medicineCategory"}
              >
                Medicine Category
              </StyledFormLabel>
              <TextField
                name="medicineCategory"
                value={formData.medicineCategory}
                onChange={handleChange}
                fullWidth
                required
                onFocus={() => setFocusedField("medicineCategory")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="priceofonemedicineinTablet"
                focused={focusedField === "priceofonemedicineinTablet"}
              >
                Medicine Price Per Tablet
              </StyledFormLabel>
              <TextField
                name="priceofonemedicineinTablet"
                type="number"
                value={formData.priceofonemedicineinTablet}
                onChange={handleChange}
                fullWidth
                required
                onFocus={() => setFocusedField("priceofonemedicineinTablet")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                xl: "row",
                lg: "row",
              },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicinequantityinonetablet"
                focused={focusedField === "medicinequantityinonetablet"}
              >
                Medicine Quantity in One Tablet
              </StyledFormLabel>
              <TextField
                name="medicinequantityinonetablet"
                type="number"
                value={formData.medicinequantityinonetablet}
                onChange={handleChange}
                fullWidth
                onFocus={() => setFocusedField("medicinequantityinonetablet")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="mediciinemadeIN"
                focused={focusedField === "mediciinemadeIN"}
              >
                Medicine Made In
              </StyledFormLabel>
              <TextField
                name="mediciinemadeIN"
                value={formData.mediciinemadeIN}
                onChange={handleChange}
                fullWidth
                required
                onFocus={() => setFocusedField("mediciinemadeIN")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                xl: "row",
                lg: "row",
              },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicineExpiryDate"
                focused={focusedField === "medicineExpiryDate"}
              >
                Medicine Expiry Date
              </StyledFormLabel>
              <TextField
                name="medicineExpiryDate"
                type="date"
                value={formData.medicineExpiryDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onFocus={() => setFocusedField("medicineExpiryDate")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="medicineManufacturingDate"
                focused={focusedField === "medicineManufacturingDate"}
              >
                Medicine Manufacturing Date
              </StyledFormLabel>
              <TextField
                name="medicineManufacturingDate"
                type="date"
                value={formData.medicineManufacturingDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onFocus={() => setFocusedField("medicineManufacturingDate")}
                onBlur={() => setFocusedField("")}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                xl: "row",
                lg: "row",
              },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel
                htmlFor="submit"
                focused={focusedField === "submit"}
              >
                Click on Create
              </StyledFormLabel>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={<CreateIcon />}
                onFocus={() => setFocusedField("submit")}
                onBlur={() => setFocusedField("")}
              >
                {loading ? <CircularProgress size={24} /> : "Create Medicine"}
              </Button>
            </Box>
            <Box sx={{ flex: 1, border: "1px solid lightgray", padding: 2 }}>
              <StyledFormLabel htmlFor="sellerID">
                Medicine SellerID
              </StyledFormLabel>
              <TextField
                name="SellerID"
                type="number"
                value={formData.sellerID}
                fullWidth
                required
                disabled
              />
            </Box>
          </Box>
        </form>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default CreateMedicine;
