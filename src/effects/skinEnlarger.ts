export function enlargeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    if (image.height === 32) {
        const context = canvas.getContext('2d');
        if (!context) return;
        for (let x = 0; x < 16; x++) {
            for (let y = 16; y < 32; y++) {
                context.putImageData(context.getImageData(x, y, 1, 1), x + 16, y + 32);
            }
        }
        for (let x = 40; x < 56; x++) {
            for (let y = 16; y < 32; y++) {
                context.putImageData(context.getImageData(x, y, 1, 1), x - 8, y + 32);
            }
        }
    }
    return canvas
}

export async function enlargeUri(uri: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = uri;
    await new Promise((resolve) => {
        image.onload = loaded;

        function loaded() {
            resolve(null);
        }
    });
    canvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height);
    enlargeCanvas(canvas, image)
    return canvas.toDataURL();
}
