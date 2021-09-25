import { createOrbitControls, SkinViewer, WalkingAnimation } from 'skinview3d';
import React, { useEffect } from 'react';
import { ModelType } from 'skinview-utils';

let skinViewer: SkinViewer;

export default function Skinview({
    size,
    skin,
}: {
    size: { height: number; width: number };
    skin: { skinUrl: string; capeUrl?: string; model: ModelType | 'auto-detect' };
}) {
    const ref = React.createRef<HTMLCanvasElement>();

    useEffect(() => {
        skinViewer = new SkinViewer({
            canvas: ref.current ?? undefined,
            width: size.width,
            height: size.height,
            skin: skin.skinUrl,
            cape: skin.capeUrl,
            alpha: true,
            model: skin.model,
        });
        let control = createOrbitControls(skinViewer);
        control.enableRotate = true;
        control.enableZoom = false;
        control.enablePan = false;

        let walk = skinViewer.animations.add(WalkingAnimation);
        walk.speed = 0.7;
    }, []);

    useEffect(() => {
        skinViewer.setSize(size.width, size.height);
    }, [size]);

    useEffect(() => {
        if (skin.capeUrl) skinViewer.loadCape(skin.capeUrl);
        else skinViewer.resetCape();
    }, [skin]);

    return (
        <div>
            <canvas ref={ref} style={{ imageRendering: 'pixelated' }} />
        </div>
    );
}
