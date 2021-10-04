import { AnimationHandle, createOrbitControls, SkinViewer, WalkingAnimation } from 'skinview3d';
import React, { useEffect, useState } from 'react';
import { ModelType } from 'skinview-utils';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

let skinViewer: SkinViewer;
let walk: AnimationHandle;

const BackgroundImage = styled.div`
    ${tw`h-full w-max rounded-lg shadow-md border-gray-300 border-4 max-w-full`}
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABtJREFUGFdj3Lt3738nJycGxv/////ft28fAwBbawo1G1p8AgAAAABJRU5ErkJggg==");
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    background-repeat: repeat;
    background-size: 40px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABtJREFUGFdjfPfu3X9BQUEGxv////9///49AwBfcArIPbKUHwAAAABJRU5ErkJggg==');
`;

export default function Skinview({
    size,
    skin,
}: {
    size: { height: number; width: number };
    skin: { skinUrl: string; capeUrl?: string; model: ModelType | 'auto-detect' };
}) {
    const ref = React.createRef<HTMLCanvasElement>();

    let [doWalk, setDoWalk] = useState(false);

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

        walk = skinViewer.animations.add(WalkingAnimation);
        walk.progress = 1.5;
        walk.speed = 0.56;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        skinViewer.setSize(size.width, size.height);
    }, [size]);

    useEffect(() => {
        skinViewer.loadSkin(skin.skinUrl);
        if (skin.capeUrl) skinViewer.loadCape(skin.capeUrl);
        else skinViewer.resetCape();
    }, [skin]);

    useEffect(() => {
        walk.paused = !doWalk;
    }, [doWalk]);

    return (
        <div css={tw`mx-auto`}>
            <BackgroundImage>
                <div
                    onClick={() => setDoWalk(!doWalk)}
                    css={tw`text-gray-700 w-full flex justify-end hover:cursor-pointer`}
                >
                    <div css={tw`p-2 absolute`}>
                        <FontAwesomeIcon icon={doWalk ? faPause : faPlay} size={'2x'} />
                    </div>
                </div>
                <div
                    css={css`
                        width: ${size.width};
                        height: ${size.height};
                        max-width: 80vw;
                        max-height: calc(80vw * ${size.height / size.width});
                    `}
                >
                    <canvas
                        ref={ref}
                        style={{ imageRendering: 'pixelated' }}
                        css={css`
                            width: ${size.width};
                            height: ${size.height};
                            max-width: 80vw;
                            max-height: calc(80vw * ${size.height / size.width});
                        `}
                    />
                </div>
            </BackgroundImage>
        </div>
    );
}
