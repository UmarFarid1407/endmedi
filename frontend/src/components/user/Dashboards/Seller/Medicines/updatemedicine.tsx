import {
  useState,
  TextField,
  Button,
  useNavigation,
  decodeToken,
  FormLabel,
  Alert,
  CircularProgress,
  styled,
  updateMedicine,
  getMedicineById,
  React,
  Box,
  AddAlertIcon,
  useEffect,
  Typography,
} from "../../../../../sharedimports/share";
import { MedicineFormData } from "../../types/types";

const UpdateMedicine: React.FC<{ medicineId: number }> = ({ medicineId }) => {
  const [formData, setFormData] = useState<MedicineFormData>({
    medicineName: "",
    medicineQuantity: 0,
    medicineCategory: "",
    priceofonemedicineinTablet: 0,
    medicinequantityinonetablet: 0,
    mediciinemadeIN: "",
    medicineExpiryDate: "",
    sellerID: 0,
    medicineManufacturingDate: "",
    medicineID: medicineId,
  });

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { navigateToDashboard } = useNavigation();
  const [userId, setUserId] = useState<number>();
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    if (medicineId) {
      const fetchMedicineDetails = async () => {
        try {
          const data = await getMedicineById(medicineId);
          console.log(data);
          setFormData({
            medicineName: data.medicineName || "",
            medicineQuantity: data.medicineQuantity || 0,
            medicineCategory: data.medicineCategory || "",
            priceofonemedicineinTablet: data.priceofonemedicineinTablet || 0,
            medicinequantityinonetablet: data.medicinequantityinonetablet || 0,
            mediciinemadeIN: data.mediciinemadeIN || "",

            medicineExpiryDate: data.medicineExpiryDate
              ? new Date(data.medicineExpiryDate).toISOString().split("T")[0]
              : "",

            sellerID: data.sellerID || 0,
            medicineManufacturingDate: data.medicineManufacturingDate
              ? new Date(data.medicineManufacturingDate)
                  .toISOString()
                  .split("T")[0]
              : "",

            medicineID: data.medicineID || medicineId,
          });
        } catch (err: any) {
          setError("Failed to fetch medicine details");
        } finally {
          setIsFetching(false);
        }
      };

      fetchMedicineDetails();
    }
  }, [medicineId]);

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
      const { medicineID, ...updateData } = formData;
      const response = await updateMedicine(medicineId, updateData);
      setMessage(response.message || "Medicine updated successfully!");
      window.location.reload();
      navigateToDashboard();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const StyledFormLabel = styled(FormLabel)(({ theme, focused }) => ({
    color: focused ? theme.palette.primary.main : theme.palette.text.primary,
    transition: "color 0.3s",
  }));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Update Medicine
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
                startIcon={<AddAlertIcon />}
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
                // label="Seller ID"
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

export default UpdateMedicine;
