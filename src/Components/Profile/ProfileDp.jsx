import React, { useRef, useState } from 'react'
import { useAuthContext } from '../../Context/Auth';
import avatar from "../../assets/icons/avatar.png";
import plus from "../../assets/icons/plus.png";
import { db } from '../../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function ProfileDp() {
    const inputFileRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const {UserId,User} = useAuthContext()
     const uploadImageToCloudinary = async (imageFile) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "unsigned_preset"); // Replace with your Cloudinary preset
  
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dfxido6sm/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (!data.secure_url) {
          throw new Error("No secure URL returned");
        }
        return data.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
      }
    };
  
    const handleProfilePic = () => {
      inputFileRef.current.click();
    };
    
    const handleFileChange = async (e) => {
      
      
      const selectedFile = e.target.files[0]; // Get the first file
      if (!selectedFile) return;
      
      setIsUploading(true); // Show a loading state while processing
      try {
        // Upload to Cloudinary
        const imageUrl = await uploadImageToCloudinary(selectedFile);
        console.log("Uploaded Image URL:", imageUrl);
  
        // Update Firestore document
        const userRef = doc(db, "Users", UserId);
        await updateDoc(userRef, { img: imageUrl });
        console.log("Firestore updated successfully");
        
      } catch (error) {
        console.error("Error uploading and updating image:", error);
      } finally {
        setIsUploading(false); // Reset loading state
      }
    };
    
  return (
          <div
            onClick={handleProfilePic}
            className="w-[120px] h-[120px] mb-12 bg-gray-200 rounded-full relative overflow-hidden cursor-pointer border-2 border-dashed border-gray-400 flex items-center justify-center"
          >
            {/* Show profile picture or plus icon */}
            {User?.img ? (
              <img
                src={User?.img}
                className="w-full h-full object-cover rounded-full"
                alt="Profile"
              />
            ) : (
              <img src={plus} className="h-8" alt="Upload Icon" />
            )}
    
            {/* Overlay with uploading indicator */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold">Uploading...</span>
              </div>
            )}
    
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputFileRef}
              className="hidden"
            />
          </div>
  )
}

export default ProfileDp