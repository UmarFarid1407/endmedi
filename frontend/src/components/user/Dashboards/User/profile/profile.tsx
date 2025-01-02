import "./styles.css";

import { UserProfile } from "../../types/types";
import {
  useEffect,
  useState,
  Box,
  ProfileCard,
  SettingsCard,
  CssBaseline,
  getUserProfileById,
  createTheme,
  decodeToken,
  ThemeProvider,
  ResponsiveAppBar,
  React,
} from "../../../../../sharedimports/share";

const theme = createTheme();

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [state, setState] = useState("");
  const [userId, setUserId] = useState<number>();
  const [userRole, setUserRole] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  useEffect(() => {
    if (state === "dummy") {
      alert("Update your profile with the data");
    }
  }, [state]);

  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserId(getdecodedToken.id);
      setUserEmail(getdecodedToken.email);
      setUserRole(getdecodedToken.role);
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }

    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfileById(userId);

          if (response?.profile) {
            setUserProfile(response.profile);
          }
          if (response.message === "Profile not found") {
            setState("dummy");
            setUserProfile({
              firstName: "Dummy Data",
              lastName: "Dummy Data",
              middleName: "Dummy Data",
              phoneNumber: "0342345223",
              email: "dummy",
              password: "dummy",
              gender: "male",
              role: "user",
              id: 0,
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchProfile();
    }
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const fullName = `${userProfile.firstName} ${userProfile.middleName} ${userProfile.lastName}`;

  return (
    <Box>
      {userRole === "user" && <ResponsiveAppBar />}

      <Box>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                alt="avatar"
                sx={{
                  width: "100vw",
                  height: "35vh",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
                src="https://iris2.gettimely.com/images/default-cover-image.jpg"
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  marginTop: -25,
                  px: { xs: 0, md: 7 },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <ProfileCard
                    name={fullName}
                    USERID={userId}
                    USEREMAIL={userEmail}
                    USERROLE={userRole}
                  />
                </Box>

                <Box sx={{ flex: 2 }}>
                  <SettingsCard
                    firstName={userProfile.firstName}
                    lastName={userProfile.lastName}
                    middleName={userProfile.middleName}
                    phoneNumber={userProfile.phoneNumber}
                    email={userProfile.email}
                    password={userProfile.password}
                    gender={userProfile.gender}
                  />
                </Box>
              </Box>
            </Box>
          </CssBaseline>
        </ThemeProvider>
      </Box>
    </Box>
  );
};
export default Profile;
