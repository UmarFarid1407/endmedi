import {
  Box,
  useState,
  useEffect,
  AdminNavbar,
  PharmacistNavbar,
  decodeToken,
  SellerNavbar,
  UserDashboard
} from "./../../../sharedimports/share";

export default function Dashboard() {
  const [userId, setUserId] = useState<number>();
  const [userrole, setUserRole] = useState<string>();
  useEffect(() => {
    const shouldDecode = true;
    const getdecodedToken = decodeToken(shouldDecode);

    if (getdecodedToken && typeof getdecodedToken === "object") {
      setUserId(getdecodedToken.id);
      setUserRole(getdecodedToken.role);
    }

    if (getdecodedToken == null) {
      return console.log("user not found");
    }
  }, [userId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {userrole === "seller" && <SellerNavbar />}
      {userrole === "pharmacist" && <PharmacistNavbar />}
      {userrole === "admin" && <AdminNavbar />}
      {userrole === "user" && <UserDashboard />}
    </Box>
  );
}
