import { MouseEvent } from "react";

import Container from "@mui/material/Container";

import AdbIcon from "@mui/icons-material/Adb";

import handleLogout from "./logoutUser";
import {
  Box,
  Tooltip,
  Avatar,
  MenuItem,
  useNavigation,
  Menu,
  Typography,
  useState,
  IconButton,
  Toolbar,
  AppBar,
  useNavigate,
} from "./../../../sharedimports/share";
const settings = ["Logout"];

function ResponsiveAdminAppBar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { navigateToDashboard } = useNavigation();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isLoggedIn = localStorage.getItem("authToken");

  const handleNavigation = (page: string) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    switch (page) {
      case "Dashboard":
        navigateToDashboard();
        break;
      case "Logout":
        handleLogout(navigate);
        break;
      default:
        break;
    }

    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Medibridge
            </Typography>

            <Box sx={{ marginLeft: "auto" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleNavigation(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAdminAppBar;
