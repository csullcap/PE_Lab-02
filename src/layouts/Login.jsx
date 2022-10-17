import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Box } from "@mui/system";
import { useEffect } from "react";
import unsa from "../assets/unsa.png";
import logo from "../assets/logo.png";

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <>
          <Typography variant="h6" component="div" gutterBottom>
            Bienvenido a la plataforma de
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <img src={logo} alt="logo" width="50" />
            <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
              Laboratorios - UNSA
            </Typography>
          </Box>
          <Typography variant="h7" component="div" gutterBottom>
            Por favor inicie sesión
          </Typography>

          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              marginTop: "1rem",
              background: "#e9ecef",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={unsa} alt="logo" width="50" height="50" />
              <Typography
                variant="h8"
                component="div"
                sx={{ ml: 2, color: "#212529" }}
              >
                Iniciar sesión con cuenta Institucional
              </Typography>
            </Box>
          </Button>
        </>
      </Box>
    </>
  );
}
