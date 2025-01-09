import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ref } from "firebase/storage";
import Properties from "../pages/Properties";


const FilesContext = createContext()

export const FilesProvider = ({ children }) => {

    const { UserId, User } = useAuthContext()
    const [properties, setProperties] = useState([])
    let propertiesArray = []
    const [RentProperties, setRentProperties] = useState([])


    const fetchPropertyById = async (Id) => {
        try {
            if (User?.Role === 'landlord') {


                const propertyRef = collection(db, `properties/${UserId}/myproperties`)
                const snapShot = await getDocs(propertyRef)


                if (snapShot) {

                    snapShot.forEach((docSnapShot) => {
                        const data = docSnapShot.data()

                        propertiesArray.push(data)
                        setProperties(propertiesArray)
                        // console.log(propertiesArray);





                    })

                    return properties
                }
                else {
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
    const fetchRentedProperties = async () => {
            if (User?.Role === 'tenant') {
            const propertiesRef = collection(db, 'AllProperties')
            const q = query(propertiesRef, where('tenantId', '==', UserId))

            try {
                const querySnapshot = await getDocs(q)
                const properties = []
                querySnapshot.forEach((doc) => {
                    properties.push(doc.data())
                })
                setRentProperties(properties)
                console.log('RentProperties',RentProperties);
                return

            } catch (error) {
                console.error('Error fetching properties: ', error)
                return
            }
        }
    }

    useEffect(() => {
        // console.log('shayan');
        // console.log(UserId);
        // if (User?.Role=== 'landlord') {
            
            fetchPropertyById(UserId)
        // }
        if (User?.Role === 'tenant') {
            fetchRentedProperties()
        }

        console.log('properties', properties);



    }, [UserId, User])

    return (
        <FilesContext.Provider value={{ properties ,RentProperties}}>
            {children}
        </FilesContext.Provider>
    )

}

export const useFilesContext = () => {
    return useContext(FilesContext)
}