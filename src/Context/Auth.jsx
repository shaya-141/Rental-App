import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [User, setUser] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Start loading
      if (firebaseUser) {
        try {
          const uid = firebaseUser.uid;
          setUserId(uid);

          // Fetch user data from Firestore
          const docRef = doc(db, "Users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data());
            setIsLoggedin(true);
          } else {
            console.error("No user data found in Firestore.");
            setUser(null);
            setIsLoggedin(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoggedin(false);
          setUser(null);
        }
      } else {
        // User is signed out
        setIsLoggedin(false);
        setUser(null);
        setUserId(null);
      }
      setLoading(false); // End loading
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin, User, UserId, loading,setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
