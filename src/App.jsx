import Login from "./layouts/login";
import MisMatriculas from "./layouts/MisMatriculas";
import Laboratorio from "./layouts/Laboratorio";
import NuevaMatricula from "./layouts/NuevaMatricula";
import Appbar from "./components/Appbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthContext";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function App() {
  const navigate = useNavigate();
  const { signInWithGoogle, user, logout, loading } = useAuth();

  return (
    <>
      <AuthProvider>
        <Appbar />
        <Box component="main" sx={{ p: 3, height: "100%" }}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MisMatriculas />
                </PrivateRoute>
              }
            />
            <Route
              path="/laboratorio/:id"
              element={
                <PrivateRoute>
                  <Laboratorio />
                </PrivateRoute>
              }
            />
            <Route
              path="/nueva-matricula"
              element={
                <PrivateRoute>
                  <NuevaMatricula />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/nueva-matricula"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            color: "#fff",
          }}
        >
          <AddIcon />
        </Fab>
      </AuthProvider>
    </>
  );
}
