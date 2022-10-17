import Login from "./layouts/login";
import MisMatriculas from "./layouts/MisMatriculas";
import NuevaMatricula from "./layouts/NuevaMatricula";
import Appbar from "./components/Appbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PrivateRoute from "./components/PrivateRoute";
import { Link } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Paper } from "@mui/material";
import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function App() {
  return (
    <>
      <Appbar />
      <Box component="main" sx={{ p: 3, height: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MisMatriculas />{" "}
                <Fab
                  color="primary"
                  aria-label="add"
                  component={Link}
                  to="/nueva-matricula"
                  sx={{
                    position: "fixed",
                    bottom: 80,
                    right: 20,
                    color: "#fff",
                  }}
                >
                  <AddIcon />
                </Fab>
              </PrivateRoute>
            }
          />
          <Route
            path="/nueva-matricula"
            element={
              <PrivateRoute>
                <NuevaMatricula />
                <Fab
                  color="primary"
                  aria-label="add"
                  component={Link}
                  to="/nueva-matricula"
                  sx={{
                    position: "fixed",
                    bottom: 80,
                    right: 20,
                    color: "#fff",
                  }}
                >
                  <AddIcon />
                </Fab>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Mis Matriculas"
            icon={<ArchiveIcon />}
            component={Link}
            to="/"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
