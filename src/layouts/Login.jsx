import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

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

  return (
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
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Button variant="contained" onClick={handleLogin}>
          Iniciar sesión con Google
        </Button>
      </>
    </Box>
  );
}
