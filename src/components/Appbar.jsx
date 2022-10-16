import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../AuthContext";
import { Avatar, Button, ListItemIcon } from "@mui/material";

const drawerWidth = 300;

export default function Appbar() {
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <img src={logo} alt="logo" width="50" />
        <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
          Laboratorios - UNSA
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component="img"
          sx={{
            height: 90,
            width: 90,
            borderRadius: "50%",
          }}
          src={user != null ? user.photoURL : ""}
          alt="logo"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="h7" noWrap component="div">
          {user != null ? user.displayName : ""}
        </Typography>
        <Typography variant="h7" noWrap component="div">
          {user != null ? user.email : ""}
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" component="nav" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "white" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              sx={{
                height: 30,
                width: 30,
                borderRadius: "50%",
                marginRight: 1,
              }}
              src={logo}
            />
            <Typography variant="h6" sx={{ color: "white" }}>
              Unsa - Horarios
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {user !== null && (
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </>
  );
}
