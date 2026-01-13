import { v2 as cloudinary } from "cloudinary";
/**
 * Uploads a file buffer to Cloudinary using a stream.
 * @param fileBuffer The buffer of the file to upload.
 * @param folder The folder in Cloudinary to store the file.
 * @returns A promise that resolves with the Cloudinary upload result.
 */
export declare const uploadToCloudinary: (fileBuffer: Buffer, folder?: string) => Promise<any>;
export default cloudinary;
//# sourceMappingURL=uploadCloudinary.d.ts.map