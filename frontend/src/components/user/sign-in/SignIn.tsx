import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  MuiCard,
  styled,
  AppTheme,
  ColorModeSelect,
  signIn,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
  useState,
} from "../../../sharedimports/share";
import {
  
  CircularProgress,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { decodeToken } from "../../../sharedimports/share";
import { useNavigation } from "../Navigation/Navigate";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
const StyledFormLabel = styled(FormLabel)(({ theme, focused }) => ({
  color: focused ? theme.palette.primary.main : theme.palette.text.primary,
  transition: "color 0.3s",
}));
export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [focusedField, setFocusedField] =useState("");
    const [userrole, setUserRole] = useState<string>();
  const { navigateToThrowUser,navigateToAdminUser,navigateToPharmacistUser,navigateToSellerUser ,navigateToHome} = useNavigation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await signIn({ email, role, password });
  console.log(response);
  const shouldDecode=true;
const getdecodedToken= decodeToken( shouldDecode);
if (getdecodedToken && typeof getdecodedToken === "object") {
  if(getdecodedToken.role==='user'){
    navigateToHome();
  }
  if(getdecodedToken.role==='pharmacist'){
    navigateToPharmacistUser();
  }
  if(getdecodedToken.role==='seller'){
    navigateToSellerUser();
  }
  if(getdecodedToken.role==='admin'){
   navigateToAdminUser();
  }
}

      
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
   
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
     const role = document.getElementById("role") as HTMLInputElement;
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!role) {
      setErrorMessage("Please select your role.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect
        sx={{ position: "fixed", top: "1.7rem", right: "1rem" }}
      />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{  overflowY: 'auto' }} >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{
              display: "flex",
              flexDirection: "column",

              gap: 2,
            }}
          >
            <FormControl>
            <StyledFormLabel
            htmlFor="email"
            focused={focusedField === "email"}
          >
            Email
          </StyledFormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
              
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
              />
            </FormControl>
            <FormControl>
            <StyledFormLabel
            htmlFor="role"
            focused={focusedField === "role"}
          >
            Role
          </StyledFormLabel>
              <Select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                fullWidth
                variant="outlined"
                color={errorMessage ? "error" : "primary"}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField("")}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="pharmacist">Pharmacist</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>

            <FormControl error={passwordError}>
            <StyledFormLabel
            htmlFor="password"
            focused={focusedField === "password"}
          >
            Password
          </StyledFormLabel>
              <OutlinedInput
                id="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••"
                type={showPassword ? "password" : "text"}
                error={passwordError}
                color={passwordError ? "error" : "primary"}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ?  <Visibility />: <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                }
              />
              {<FormHelperText error>{passwordErrorMessage}</FormHelperText>}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={validateInputs}
            >
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </Button>
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </Box>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
