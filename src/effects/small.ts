export interface customMarkup {
    skins: number;
    author?: string
    name?: string
    short?: string
    ranges: {
        skin: number;
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        paste?: {
            x?: number;
            y?: number;
        };
        shrink?: {
            width: number;
            height: number;
        };
    }[];
}

export default async function small(custom: customMarkup, ...skins: string[]) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const skinEls: HTMLImageElement[] = [];
    for (let i = 0; i < 2; i++) {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = skins[i];
        await new Promise((resolve) => {
            image.onload = loaded;

            function loaded() {
                resolve(null);
            }
        });
        skinEls[skinEls.length] = image;
    }
    const context = canvas.getContext('2d');
    if (!context) return;
    for (let item = 0; item < custom?.ranges?.length ?? 0; item++) {
        const range = custom.ranges[item];
        context.drawImage(
            skinEls[range.skin],
            range.start.x,
            range.start.y,
            range.end.x - range.start.x,
            range.end.y - range.start.y,
            range.paste?.x ?? range.start.x,
            range.paste?.y ?? range.start.y,
            range.shrink?.width ?? range.end.x - range.start.x,
            range.shrink?.height ?? range.end.y - range.start.y,
        );
    }
    return canvas.toDataURL();
}
