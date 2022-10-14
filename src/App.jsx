import Login from "./layouts/login";
import MisMatriculas from "./layouts/MisMatriculas";
import Laboratorio from "./layouts/Laboratorio";
import NuevaMatricula from "./layouts/NuevaMatricula";
import Appbar from "./components/Appbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Appbar />
        <Box component="main" sx={{ p: 3, height: "100%" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route path="/mis-matriculas" element={<MisMatriculas />} />
                    <Route
                      path="/nueva-matricula"
                      element={<NuevaMatricula />}
                    />
                    <Route path="/laboratorio/:id" element={<Laboratorio />} />
                  </Routes>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </Box>
      </AuthProvider>

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
    </>
  );
}
