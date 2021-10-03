const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { compress } = require('compress-json');

const merges = JSON.parse(fs.readFileSync('merger/merges.json').toString());
const others = fs.readdirSync('merger/other');

async function merge() {
    if (fs.existsSync('public/data.json')) await fs.rmSync('public/data.json');
    const globalImages = [];
    const globalOthers = []

    for (let i = 0; i < merges.length; i++) {
        const colors = {};
        const imageJson = {};
        const canvas = createCanvas(64, 64);
        const merge = merges[i];
        const image = await loadImage('merger/images/' + merge.image);
        canvas.getContext('2d').drawImage(image, 0, 0, 64, 64);
        for (let x = 0; x < 64; x++) {
            for (let y = 0; y < 64; y++) {
                const data = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
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
        globalImages[globalImages.length] = {
            image: imageJson,
            name: merge.name,
            short: merge.short,
            amount: merge.amount,
        };
    }

    for (let i = 0; i < others.length; i++) {
        globalOthers[globalOthers.length] = JSON.parse(fs.readFileSync('merger/other/' + others[i]).toString());
    }

    fs.writeFileSync('public/data.json', Buffer.from(JSON.stringify(compress({ combo: globalImages, other: globalOthers }))));
}

function rgbToHex(r, g, b, a) {
    if (r > 255 || g > 255 || b > 255 || a > 255) throw new Error('Invalid color component');
    return (
        '#' +
        ('00' + r.toString(16)).slice(-2) +
        ('00' + g.toString(16)).slice(-2) +
        ('00' + b.toString(16)).slice(-2) +
        ('00' + a.toString(16)).slice(-2)
    );
}

merge();

// decompress(JSON.parse(data))
