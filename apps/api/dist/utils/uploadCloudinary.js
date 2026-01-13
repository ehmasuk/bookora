import { v2 as cloudinary } from "cloudinary";
import env from "../config/env.js";
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});
/**
 * Uploads a file buffer to Cloudinary using a stream.
 * @param fileBuffer The buffer of the file to upload.
 * @param folder The folder in Cloudinary to store the file.
 * @returns A promise that resolves with the Cloudinary upload result.
 */
export const uploadToCloudinary = (fileBuffer, folder = "bookora") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: "auto",
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        uploadStream.end(fileBuffer);
    });
};
export default cloudinary;
//# sourceMappingURL=uploadCloudinary.js.map