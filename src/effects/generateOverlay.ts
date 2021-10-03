export default async function GenerateOverlay(url: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = url;
    await new Promise((resolve) => {
        image.onload = loaded;

        function loaded() {
            resolve(null);
        }
    });
    canvas.getContext('2d')!.drawImage(image, 0, 0, 64, 64);
    copyPixels(canvas, 0, 0, 32, 16, 32, 0);
    copyPixels(canvas, 16, 16, 40, 32, 0, 16);
    copyPixels(canvas, 0, 16, 16, 32, 0, 16);
    copyPixels(canvas, 40, 16, 56, 32, 0, 16);
    copyPixels(canvas, 16, 48, 32, 64, -16, 0);
    copyPixels(canvas, 32, 48, 48, 64, 16, 0);
    return canvas.toDataURL();
}

function copyPixels(
    canvas: HTMLCanvasElement,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    offsetX: number,
    offsetY: number,
) {
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            context.putImageData(context.getImageData(x, y, 1, 1), x + offsetX, y + offsetY);
        }
    }
}
