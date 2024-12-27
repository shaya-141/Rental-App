import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ref } from "firebase/storage";


const FilesContext = createContext()

export const FilesProvider = ({ children }) => {

    const { UserId, User } = useAuthContext()
    const [properties, setProperties] = useState([])
    let propertiesArray = []
    // let UserId =1 


    const fetchPropertyById = async (Id) => {
        try {

            const propertyRef = collection(db, `properties/${UserId}/myproperties`)
            const snapShot = await getDocs(propertyRef)
            
            if (snapShot) {
                snapShot.forEach((docSnapShot)=>{
                    const data = docSnapShot.data()
                    // setPropertiesArray(propertiesArray.push(data))
                    propertiesArray.push(data)
                    console.log(propertiesArray);
                    
                    
                    
                    
                    
                })
                // setProperties(propertiesArray)
                // console.log('properties array', properties);
                return

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
        console.log('shayan');
        console.log(UserId);
        fetchPropertyById(UserId)


    })

    return (
        <FilesContext.Provider value={{propertiesArray}}>
            {children}
        </FilesContext.Provider>
    )

}

export const useFilesContext = () => {
    return useContext(FilesContext)
}