import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import Properties from "../pages/Properties";

const AllPropertiesContext = createContext();

export const AllPropertiesProvider = ({ children }) => {
    const [allProperties, setAllProperties] = useState([]);
   
    const fetchProperties = async () => {
        try {
            const propertyRef = collection(db, `AllProperties`);
            // const snapshot = await getDocs(propertyRef);
            const unsub = onSnapshot(propertyRef, (snapshot) => {
                
                // console.log("snapshot", snapshot);

                if (!snapshot.empty) {
                    const propertiesArray = snapshot.docs.map((docSnap) => ({
                        id: docSnap.id,
                        ...docSnap.data(),
                    }));
                    setAllProperties(propertiesArray); // Properly update the state
                    // console.log("allProperties", propertiesArray);

                } else {
                    console.log("No properties found!");
                }
            })

            // setAllProperties(properties)

            // console.log("snapshot",snapshot);



        } catch (error) {
            console.error("Error while fetching properties:", error);
        }
    };




    useEffect(() => {

        fetchProperties();

    }, []); // Add an empty dependency array to run only on component mount

    return (
        <AllPropertiesContext.Provider value={{ allProperties }}>
            {children}
        </AllPropertiesContext.Provider>
    );
};

export const useAllPropertiesContext = () => {
    return useContext(AllPropertiesContext);
};
