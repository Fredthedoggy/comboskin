export default async function generateMerge(mergeImage: string) {
    const colors: Record<string, number> = {};
    const imageJson: Record<number, Record<number, number>> = {};
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = mergeImage;
    await new Promise((resolve) => {
        image.onload = loaded;

        function loaded() {
            resolve(null);
        }
    });
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    context.drawImage(image, 0, 0, 64, 64);
    for (let x = 0; x < 64; x++) {
        for (let y = 0; y < 64; y++) {
            const data = context.getImageData(x, y, 1, 1).data;
            if (data[3] === 0) continue;
            const hex = rgbToHex(data[0], data[1], data[2], data[3]);
            if (colors[hex] === undefined) {
                let newColor = Object.values(colors).sort()[Object.values(colors).length - 1];
                if (newColor === undefined) newColor = -1;
                colors[hex] = newColor + 1;
            }
            if (!imageJson[x]) imageJson[x] = {};
            imageJson[x][y] = colors[hex];
        }
    }
    return {
        image: imageJson,
        amount: Object.values(colors).length,
    };
}

function rgbToHex(r: number, g: number, b: number, a: number) {
    if (r > 255 || g > 255 || b > 255 || a > 255) throw new Error('Invalid color component');
    return (
        '#' +
        ('00' + r.toString(16)).slice(-2) +
        ('00' + g.toString(16)).slice(-2) +
        ('00' + b.toString(16)).slice(-2) +
        ('00' + a.toString(16)).slice(-2)
    );
}
