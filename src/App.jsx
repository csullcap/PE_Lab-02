import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./layouts/Home";
import MisMatriculas from "./layouts/MisMatriculas";
import Laboratorio from "./layouts/Laboratorio";
import NuevaMatricula from "./layouts/NuevaMatricula";
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

import logo from "./assets/logo.png";

const drawerWidth = 260;
const navItems = ["Home", "About", "Contact"];

export default function App() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6">MUI</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nueva-matricula">Nueva Matricula</Link>
          </li>
          <li>
            <Link to="/mis-matriculas">Mis Matriculas</Link>
          </li>
          <li>
            <Link to="/laboratorio/gfdgd">Laboratorio</Link>
          </li>
        </ul>
      </nav> */}

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
          {auth && (
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
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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

      {/*       <Box>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Box>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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
      </Box> */}

      <Routes>
        <Route path="/nueva-matricula" element={<NuevaMatricula />} />
        <Route path="/mis-matriculas" element={<MisMatriculas />} />
        <Route path="/laboratorio/:id" element={<Laboratorio />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
