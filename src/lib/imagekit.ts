import ImageKit from "imagekit";

export const isImageKitConfigured = Boolean(
  process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
);

export const imagekit = isImageKitConfigured
  ? new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
    })
  : null;

export async function uploadToImageKit({
  file,
  fileName,
  folder = "/assan_shadi",
}: {
  file: string | Buffer;
  fileName: string;
  folder?: string;
}): Promise<{ url: string; fileId?: string } | null> {
  if (!imagekit) {
    console.warn("ImageKit is not configured. Returning null.");
    return null;
  }

  try {
    const response = await imagekit.upload({
      file, // can be base64 string or url or Buffer
      fileName,
      folder,
      useUniqueFileName: true,
    });

    return {
      url: response.url,
      fileId: response.fileId,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
}
