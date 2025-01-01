import { ChangeEvent } from "react";
import {
  addUserDetails,
  Button,
  Box,
  Card,
  useEffect,
  useState,
  CardContent,
  InputAdornment,
  MenuItem,
  IconButton,
  FormControl,
  VisibilityOff,
  CustomInput,
  decodeToken,
  useNavigation,
  Visibility,
} from "../../../../../../sharedimports/share";

interface SettingsCardProps{
  firstName: string; 
  lastName: string;
  middleName: string;
  gender: string;
  phoneNumber: string ;
  email: string ;
  password: string ;
}

  const SettingsCard: React.FC< SettingsCardProps>= (props: any) => {
  const [userID, setUserId] = useState<number>(0);
  const { navigateToLogin } = useNavigation();
  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken) {
      if (typeof getdecodedToken === "object" && getdecodedToken.id) {
          setUserId(getdecodedToken.id); 
          
      } else {
          console.error("Invalid token format or ID is missing.");
      }
  } else {
      console.log("User not found: Token is null or undefined.");
  }
}, [userID]);
  const genderSelect = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  
  const [user, setUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    middleName: props.middleName,
    gender: props.gender,
    phoneNumber: props.phoneNumber,
    email: props.email,
    password: props.password,
    showPassword: false,
  });

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  const changeButton = async (event: any) => {
    event.preventDefault();

    if (!edit.isEdit) {
      try {
        const response = await addUserDetails(user, userID);
        console.log("User details updated successfully:", response);
        alert("User details updated successfully!");
        navigateToLogin();
      } catch (error) {
        console.error("Error updating user details:", error);
        alert("Failed to update user details. Please try again.");
      }
    }

    update((prev) => ({
      ...prev,
      disabled: !prev.disabled,
      isEdit: !prev.isEdit,
    }));
  };

  const handlePassword = () => {
    setUser((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  

  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "auto" },
            textAlign: { xs: "center", md: "start" },
          }}
        >
          <FormControl fullWidth>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={changeField}
                  title="First Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={changeField}
                  title="Last Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  id="middleName"
                  name="middleName"
                  value={user.middleName}
                  onChange={changeField}
                  title="Middle Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={changeField}
                  title="Gender"
                  dis={edit.disabled}
                  req={edit.required}
                  content={genderSelect.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  id="phoneNumber"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={changeField}
                  title="Phone Number"
                  dis={edit.disabled}
                  req={edit.required}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+92</InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeField}
                  title="Email Address"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Box>

              <Box width="100%" justifyContent={"center"}>
                <CustomInput
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={changeField}
                  title="Password"
                  dis={edit.disabled}
                  req={edit.required}
                  type={user.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassword}
                          edge="end"
                          disabled={edit.disabled}
                        >
                          {user.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box
              width="100%"
              justifyContent={"center"}
              padding={"1rem"}
              borderTop={"1px solid #e1e1e1"}
            >
              <Button
                sx={{ width: "99%", p: 1, my: 2 }}
                variant="contained"
                color="secondary"
                fullWidth
                onClick={changeButton}
              >
                {edit.isEdit ? "EDIT" : "UPDATE"}
              </Button>
            </Box>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}

export default SettingsCard;