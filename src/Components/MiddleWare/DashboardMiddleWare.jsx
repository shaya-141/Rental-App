// import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoaderComponent from "../loader";
import { useAuthContext } from "../../Context/Auth";

const DashboardMiddleware = ({ children }) => {
  const { isLoggedin, User, loading } = useAuthContext();

  if (loading) {
    // Show a loading spinner or placeholder while authentication state is being determined
    return <LoaderComponent></LoaderComponent>;
  }

  if (!isLoggedin) {
    // If the user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (User?.Role === "landlord") {
    // Redirect to landlord dashboard
    return <Navigate to="/dashboard" />;
  } else {
    // Redirect to profile
    return <Navigate to="/profile" />;
  }
};

export default DashboardMiddleware;
