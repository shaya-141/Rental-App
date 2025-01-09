import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const AllPropertiesContext = createContext();

export const AllPropertiesProvider = ({ children }) => {
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch properties once (non-real-time)
    const fetchProperties = async () => {
        setLoading(true); // Start loading
        try {
            const propertyRef = collection(db, "AllProperties");
            const snapshot = await getDocs(propertyRef);

            if (!snapshot.empty) {
                const propertiesArray = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));
                setAllProperties(propertiesArray);
            } else {
                console.log("No properties found!");
            }
        } catch (error) {
            console.error("Error while fetching properties:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Call fetchProperties once when the component mounts
    useEffect(() => {
        fetchProperties();
        console.log("Fetching properties...",allProperties);
        
    }, []); // Empty dependency array ensures this runs only once

    return (
        <AllPropertiesContext.Provider value={{ allProperties, loading }}>
            {children}
        </AllPropertiesContext.Provider>
    );
};

export const useAllPropertiesContext = () => {
    return useContext(AllPropertiesContext);
};
