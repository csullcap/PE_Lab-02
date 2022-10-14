import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Box } from "@mui/system";
import { useEffect } from "react";

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/mis-matriculas", { replace: true });
    }
  }, [user]);

  const handleGoogleSignin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Button variant="contained" onClick={handleGoogleSignin}>
          Iniciar sesión con Google
        </Button>
      </Box>
    </>
  );
}
