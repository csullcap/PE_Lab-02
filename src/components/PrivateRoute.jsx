import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!user) return <Navigate to="/login" replace={true} />;
  return children;
}
