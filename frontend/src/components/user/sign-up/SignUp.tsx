import React, { useState } from "react";

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
  signUp,
  Select,
  MenuItem,
  VisibilityOff,
  Visibility,
  FormHelperText,
  IconButton,
  InputAdornment,

} from "../../../sharedimports/share";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigation } from "../Navigation/Navigate";
import {
  OutlinedInput,
} from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
  // '@media (height: 600px)': {
  //   backgroundColor: 'red',
  //   height: 'auto',
  //   minHeight: '600px',
  //   overflowY: 'auto',
  //   padding: theme.spacing(2),
  // },
}));
const StyledFormLabel = styled(FormLabel)(({ theme, focused }) => ({
  color: focused ? theme.palette.primary.main : theme.palette.text.primary,
  transition: "color 0.3s",
}));
export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [focusedField, setFocusedField] = useState("");

  const { navigateToLogin } = useNavigation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!role) {
      setErrorMessage("Please select your role.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await signUp({ name, email, password, role });
      console.log(response);
      if (response.user) {
        navigateToLogin();
      } else {
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage('user can not created try another email ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
            <StyledFormLabel
            htmlFor="name"
            focused={focusedField === "name"}
          >
            Full Name
          </StyledFormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                autoFocus
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField("")}
              />
            </FormControl>
            <FormControl>
            <StyledFormLabel
            htmlFor="email"
            focused={focusedField === "email"}
          >
            Email
          </StyledFormLabel>
              <TextField
                required
                fullWidth
                id="email"
                
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? "error" : "primary"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
              />
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
                fullWidth
                error={passwordError}
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField("")}
                color={passwordError ? "error" : "primary"}
                autoComplete="current-password"
                name="password"
                placeholder="••••••"
                type={showPassword ? "password" : "text"}
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {passwordError && (
                <FormHelperText error>{passwordErrorMessage}</FormHelperText>
              )}
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
                color={emailError ? "error" : "primary"}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField("")}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="pharmacist">Pharmacist</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={validateInputs}
            >
             {loading ? <CircularProgress size={24} /> : "Sign up"}
            </Button>
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </Box>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
