const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.crossOrigin = 'anonymous';
        image.src = url;
    });

async function getCroppedImg(imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get canvas 2D context');
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return canvas.toDataURL('image/jpeg');
}

export const cropImage = async (image: string | undefined, croppedAreaPixels: { x: number; y: number; width: number; height: number } | null, onError: (error: unknown) => void): Promise<string> => {
    try {
        if (!image || !croppedAreaPixels) {
            throw new Error('Image or cropped area is missing');
        }
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        return croppedImage;
    } catch (err) {
        onError(err);
        throw err;
    }
};

// Utility function to convert base64 string to File object
export const base64ToFile = (base64String: string, filename: string): File => {
    const [metadata, data] = base64String.split(';base64,');
    const mimeType = metadata.split(':')[1];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    return new File([arrayBuffer], filename, { type: mimeType });
};