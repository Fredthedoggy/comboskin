const fs = require('fs');
const { loadImage, createCanvas} = require('canvas');
fs.readdirSync('overlaycreator/images').forEach(async (f) => {
    const canvas = createCanvas(64, 64);
    const image = await loadImage('overlaycreator/images/' + f);
    canvas.getContext('2d').drawImage(image, 0, 0, 64, 64);
    copyPixels(canvas, 0, 0, 32, 16, 32, 0)
    copyPixels(canvas, 16, 16, 40, 32, 0, 16)
    copyPixels(canvas, 0, 16, 16, 32, 0, 16)
    copyPixels(canvas, 40, 16, 56, 32, 0, 16)
    copyPixels(canvas, 16, 48, 32, 64, -16, 0)
    copyPixels(canvas, 32, 48, 48, 64, 16, 0)
    await fs.writeFileSync('overlaycreator/images/' + f, Buffer.from(canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""), 'base64'))
});

function copyPixels(canvas, startX, startY, endX, endY, offsetX, offsetY) {
    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            canvas.getContext('2d').putImageData(canvas.getContext('2d').getImageData(x, y, 1, 1), x + offsetX, y + offsetY);
        }
    }
}
