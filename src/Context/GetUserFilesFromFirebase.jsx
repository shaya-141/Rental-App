import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ref } from "firebase/storage";
import Properties from "../pages/Properties";


const FilesContext = createContext()

export const FilesProvider = ({ children }) => {

    const { UserId, User } = useAuthContext()
    const [properties, setProperties] = useState([])
    let propertiesArray = []
  

    const fetchPropertyById = async (Id) => {
        try {
            if (User?.Role === 'landlord') {
                
                
                const propertyRef = collection(db, `properties/${UserId}/myproperties`)
                const snapShot = await getDocs(propertyRef)
                
                
                if (snapShot) {
                
                snapShot.forEach((docSnapShot)=>{
                    const data = docSnapShot.data()
                    
                    propertiesArray.push(data)
                    setProperties(propertiesArray)
                    // console.log(propertiesArray);
                    
                    
                    
                    
                    
                })
                
                return properties
            }
            else{
                console.log('user is tenant');
                return null
            }

            }
            else {
                console.log("No such document!");
                return null;
            }



        } catch (error) {
            console.log("error while fetching property", error);

        }
    }

    useEffect(() => {
        // console.log('shayan');
        // console.log(UserId);
        
        fetchPropertyById(UserId)

        console.log('properties',properties);
        


    },[UserId, User])

    return (
        <FilesContext.Provider value={{properties}}>
            {children}
        </FilesContext.Provider>
    )

}

export const useFilesContext = () => {
    return useContext(FilesContext)
}