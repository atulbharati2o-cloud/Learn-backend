import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET   
})

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            throw new Error("File path is required");
        }

        //upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        //file has been uploaded to cloudinary, now we can remove it from local storage
        console.log("File is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath); //delete file from local storage
        return response;
    } catch(error){
        fs.unlinkSync(localFilePath); //delete file from local storage in case of error as well
        console.error("Error uploading file on cloudinary", error);
        throw error;
    }
}

export { uploadOnCloudinary };