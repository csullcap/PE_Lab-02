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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../AuthContext";
import { Avatar, Button } from "@mui/material";

const drawerWidth = 260;
const navItems = [
  { name: "Home", path: "/" },
  { name: "Mis Matriculas", path: "/mis-matriculas" },
  { name: "Laboratorio", path: "/laboratorio" },
  { name: "Nueva Matricula", path: "/nueva-matricula" },
];

export default function Appbar() {
  const { logout, user } = useAuth();
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6">Horario-unsa</Typography>
      <Typography variant="h5">
        {user !== null ? user.displayName : "Anonimo"}
      </Typography>
      <Typography variant="h5">Horario-unsa</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Cerrar sesión
      </Button>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            onClick={() => navigate(item.path)}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  /*   const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 */

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
              alt="The house from the offer."
              src={logo}
            />
            <Typography variant="h6" sx={{ color: "white" }}>
              Unsa - Horarios
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
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
    </>
  );
}
