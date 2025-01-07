import { Navigate } from "react-router-dom";
import LoaderComponent from "../loader";
import { useAuthContext } from "../../Context/Auth";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const DashboardMiddleware = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { isLoggedin } = useAuthContext();
  const [isLoggedin, setisLoggedin] = useState(false)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "Users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User data:", userData);  // Debugging the user data
          setUserRole(userData.role); 
          setisLoggedin(true)// Assuming the role field exists
        } else {
          console.log("No user data found!");
        }
      } else {
        console.log("No authenticated user found.");
      }
      setLoading(false);
    });

    console.log('afaf'.isLoggedin);
    
  }, []);

  if (loading) {
    // Show a loading spinner or placeholder while authentication state is being determined
    return  <div className="w-screen h-screen flex justify-center items-center">


    <LoaderComponent />;
    </div>  
  }

  if (!isLoggedin) {
    // If the user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (userRole === "landlord") {
    // Redirect to landlord dashboard
    return <Navigate to="/dashboard" />;
  } else if (userRole === "tenant") {
    // Redirect to tenant profile
    return <Navigate to="/profile" />;
  } else {
    // Fallback case, show loading again or redirect somewhere
    return <Navigate to="/login" />;
  }
};

export default DashboardMiddleware;
