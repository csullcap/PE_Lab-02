import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Box } from "@mui/system";
import { useEffect } from "react";

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
            Bienvenido a la plataforma de matrículas de laboratorio
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Por favor inicie sesión con su cuenta Institucional
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              marginTop: "1rem",
            }}
          >
            Iniciar sesión con Google
          </Button>
        </>
      </Box>
    </>
  );
}
