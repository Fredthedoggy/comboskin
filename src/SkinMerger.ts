import {enlargeCanvas} from "./effects/skinEnlarger";

export default async function SkinMerger(
    apply: {
        image: Record<number, Record<number, number>>;
        amount: number;
    },
    ...skins: string[]
) {
    if (skins.length < apply.amount) {
        console.error('Too Few Arguments');
        throw new Error('Too Few Arguments');
    }
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const skinEls: HTMLCanvasElement[] = [];
    for (let i = 0; i < apply.amount; i++) {
        let skinCanvas = document.createElement('canvas');
        skinCanvas.width = 64;
        skinCanvas.height = 64;
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = skins[i];
        await new Promise((resolve) => {
            image.onload = loaded;

            function loaded() {
                resolve(null);
            }
        });
        skinCanvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height);
        skinCanvas = enlargeCanvas(skinCanvas, image)!;
        skinEls[skinEls.length] = skinCanvas;
    }
    const context = canvas.getContext('2d');
    if (!context) return;
    for (let x = 0; x < 64; x++) {
        if (!apply.image[x]) continue;
        for (let y = 0; y < 64; y++) {
            if (apply.image[x][y] === undefined) continue;
            context.putImageData(skinEls[apply.image[x][y]].getContext('2d')!.getImageData(x, y, 1, 1), x, y);
        }
    }
    return canvas.toDataURL();
}
