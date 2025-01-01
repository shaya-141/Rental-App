import React, { useState } from 'react';
import { useAuthContext } from '../../Context/Auth';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../utils/firebase'; // Removed storage import, not using Firebase Storage
import { toast } from 'sonner';
import { useDashboardContext } from '../../Context/ActiveDashboardPage';
import LoaderComponent from '../loader';

function AddPropertyFormStructure() {
    const { UserId } = useAuthContext();
    const { PropertyFormShowOrNot, setPropertyFormShowOrNot } = useDashboardContext()
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [formData, setFormData] = useState({
        propertyName: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        kitchens: '',
        area: '',
        rent: '',
        furnished: '',
        address: '',
        images: [], // Add an images field to formData
    });
    const [errors, setErrors] = useState({});

    // Handle image input
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImageUrls]);
        setFormData({ ...formData, images: [...formData.images, ...files] }); // Add selected images to formData
    };

    // Handle image selection
    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    // Remove a specific image
    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        }); // Remove the corresponding file from formData
        if (selectedImageIndex === index) setSelectedImageIndex(null); // Reset selection if the removed image was selected
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Form validation
    const validateForm = () => {
        let validationErrors = {};
        if (!formData.propertyName) validationErrors.propertyName = 'Property name is required.';
        if (!formData.propertyType) validationErrors.propertyType = 'Property type is required.';
        if (!formData.bedrooms || formData.bedrooms <= 0) validationErrors.bedrooms = 'Please enter a valid number of bedrooms.';
        if (!formData.bathrooms || formData.bathrooms <= 0) validationErrors.bathrooms = 'Please enter a valid number of bathrooms.';
        if (!formData.kitchens || formData.kitchens <= 0) validationErrors.kitchens = 'Please enter a valid number of kitchens.';
        if (!formData.area || formData.area <= 0) validationErrors.area = 'Please enter a valid area in gaz.';
        if (!formData.rent || formData.rent <= 0) validationErrors.rent = 'Please enter a valid rent amount.';
        if (!formData.furnished) validationErrors.furnished = 'Please select the furnished option.';
        if (!formData.address) validationErrors.address = 'Address is required.';
        if (images.length === 0) validationErrors.images = 'At least one image is required.';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Upload image to Cloudinary
    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "unsigned_preset"); // Replace with your Cloudinary preset
        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dfxido6sm/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Return the URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            throw error;
        }
    };

    // Save property to Firestore
    const addPropertyToFirebase = async (formData) => {
        try {
            // Reference to Firestore collection
            setLoading(true)
            const propertiesCollection = collection(db, `properties/${UserId}/myproperties`);
            const AllPropertiesCollection = collection(db,'AllProperties')
            // Upload images to Cloudinary
            const imageUrls = await Promise.all(
                formData.images.map((imageFile) => uploadImageToCloudinary(imageFile))
            );

            // Add image URLs to formData
            const dataToSave = {
                ...formData,
                createdAt: new Date().toISOString(),
                OwnerId: UserId,
                tenantId: "none",
                images: imageUrls, // Replace File objects with URLs
            };

            // Save the property data to Firestore
            const docRef = await addDoc(propertiesCollection, dataToSave);
            const secounddocRef = await addDoc(AllPropertiesCollection, dataToSave);

            console.log("Document written with ID: ", docRef.id);
            toast.success("Property added successfully!");
            setLoading(false)
            setPropertyFormShowOrNot(false)
        } catch (error) {
            setLoading(true)
            console.error("Error adding property to Firebase:", error);
            toast.error("Failed to add property. Please try again.");
            setLoading(false)
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (validateForm()) {
            addPropertyToFirebase(formData);
            setFormData({})
        } else {
            console.log('Form has errors.');
        }
    };
    return (
        <div className='mt-4 text-[#656e73] h-[full] w-full'>
            {/* First Row */}
            <div className='flex items-center gap-4 w-full'>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Property Name</p>
                    <input
                        type="text"
                        name="propertyName"
                        placeholder='House Name'
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.propertyName && <p className="text-red-500 text-sm">{errors.propertyName}</p>}
                </label>
                <label htmlFor="" className='flex flex-col font-medium'>
                    <p>Property Type</p>
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className='p-1 h-9 w-[220px] rounded border-gray-500 border mt-1'
                    >
                        <option value="">Select Property Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType}</p>}
                </label>
            </div>

            {/* Second Row */}
            <div className='flex items-center mt-3 gap-4 w-full'>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Bedrooms</p>
                    <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder='Number of bedrooms'
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.bedrooms && <p className="text-red-500 text-sm">{errors.bedrooms}</p>}
                </label>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Bathrooms</p>
                    <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder='Number of bathrooms'
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.bathrooms && <p className="text-red-500 text-sm">{errors.bathrooms}</p>}
                </label>
            </div>

            {/* Third Row */}
            <div className='flex items-center mt-3 gap-4 w-full'>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Kitchens</p>
                    <input
                        type="number"
                        name="kitchens"
                        value={formData.kitchens}
                        onChange={handleInputChange}
                        placeholder='Number of kitchens'
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.kitchens && <p className="text-red-500 text-sm">{errors.kitchens}</p>}
                </label>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Area</p>
                    <input
                        type="number"
                        name="area"
                        value={formData.areaInGaz}
                        onChange={handleInputChange}
                        placeholder='Enter size in gaz'
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                </label>
            </div>

            {/* Fourth Row */}
            <div className='flex items-center mt-3 gap-4 w-full'>
                <label htmlFor="" className='flex flex-col gap-1 font-medium'>
                    <p>Rent</p>
                    <input
                        type="number"
                        name="rent"
                        value={formData.rent}
                        onChange={handleInputChange}
                        placeholder='Monthly rent'
                        className='h-9 rounded p-3 border border-gray-500'
                    />
                    {errors.rent && <p className="text-red-500 text-sm">{errors.rent}</p>}
                </label>
                <label htmlFor="" className='flex flex-col font-medium'>
                    <p>Furnished</p>
                    <select
                        name="furnished"
                        value={formData.furnished}
                        onChange={handleInputChange}
                        className='p-1 h-9 w-[220px] rounded border-gray-500 border mt-1'
                    >
                        <option value="">Select Furnishing</option>
                        <option value="unfurnished">Unfurnished</option>
                        <option value="semi-furnished">Semi-Furnished</option>
                        <option value="fully-furnished">Fully-Furnished</option>
                    </select>
                    {errors.furnished && <p className="text-red-500 text-sm">{errors.furnished}</p>}
                </label>
            </div>

            {/* Fifth Row */}
            <div className='flex items-center mt-3 gap-4 w-full'>
                <label htmlFor="" className='flex flex-col gap-1 w-full font-medium'>
                    <p>Address</p>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder='Enter complete address'
                        className='h-9 rounded p-3 border border-gray-500 w-[97%]'
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </label>
            </div>


            {/* Image Upload */}
            <div>
                <label htmlFor="image-upload" className="mt-4 flex flex-col w-full gap-1 font-medium">
                    <p>Upload Property Images</p>
                    <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 p-1 rounded w-[97%] border border-gray-500"
                    />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                </label>
                <div className="mt-4 flex gap-2">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                            <img
                                src={imageUrl}
                                alt="preview"
                                className="h-20 w-20 object-cover rounded"
                                onClick={() => handleImageSelect(index)}
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 text-white bg-red-500 p-1 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-[97%] mt-3 h-10 text-white rounded-lg bg-[#0b1D27]"
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <LoaderComponent size={16} color="#ffffff" />
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </div>
    );
}

export default AddPropertyFormStructure;
