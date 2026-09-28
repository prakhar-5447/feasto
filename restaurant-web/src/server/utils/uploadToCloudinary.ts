import cloudinary from "@/server/config/cloudinary";

export const uploadToCloudinary = (
    file: File
): Promise<string> => {
    return new Promise(
        async (
            resolve,
            reject
        ) => {
            try {
                const bytes =
                    await file.arrayBuffer();

                const buffer =
                    Buffer.from(bytes);

                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder:
                                "food-items",
                            resource_type:
                                "image",
                        },
                        (
                            error,
                            result
                        ) => {
                            if (error) {
                                reject(
                                    error
                                );
                                return;
                            }

                            if (
                                !result?.secure_url
                            ) {
                                reject(
                                    new Error(
                                        "Cloudinary upload failed"
                                    )
                                );
                                return;
                            }

                            resolve(
                                result.secure_url
                            );
                        }
                    );

                uploadStream.end(
                    buffer
                );
            } catch (error) {
                reject(error);
            }
        }
    );
};