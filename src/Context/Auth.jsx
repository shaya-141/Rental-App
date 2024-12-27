import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";


const AuthContext =  createContext()

export const AuthProvider = ({children}) =>{
        const [isLoggedin, setIsLoggedin] = useState(false)
        const [User, setUser] = useState(null)
        const [UserId, setUserId] = useState(null)

        useEffect(()=>{
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUserId(uid)
                const docref = doc(db,"Users",uid)
                const data = await getDoc(docref)
                setIsLoggedin(true)
                setUser(data.data())
                console.log("user id",uid);
                console.log("getdata",User);
                
                
                // ...
              } else {
                // User is signed out
                // ...
              }
            });
        },[])


        return(
            <AuthContext.Provider value={{isLoggedin,User,UserId}}>
                {children}
            </AuthContext.Provider>
        )


}

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}