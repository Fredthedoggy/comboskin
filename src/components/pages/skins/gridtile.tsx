import React, { Suspense } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SkinViewer } from 'skinview3d';
import { Async } from 'react-async';

async function skinImage(skinUrl: string, capeUrl?: string | null, slim?: boolean) {
    const skinViewer = new SkinViewer({
        width: 500,
        height: 800,
        renderPaused: true,
        model: slim ?? false ? 'slim' : 'default',
    });
    skinViewer.camera.rotation.x = -0.62;
    skinViewer.camera.rotation.y = 0.534;
    skinViewer.camera.rotation.z = 0.348;
    skinViewer.camera.position.x = 30.5;
    skinViewer.camera.position.y = 24.0;
    skinViewer.camera.position.z = 42.0;

    await skinViewer.loadSkin(skinUrl);
    if (capeUrl) await skinViewer.loadCape(capeUrl);

    skinViewer.render();
    const image = skinViewer.canvas.toDataURL();
    skinViewer.dispose();
    return image;
}

export default function Gridtile({ skin, name }: { skin: string; name: string }) {
    const BackgroundImage = styled.div`
        ${tw`h-full w-max rounded-lg shadow-md border-gray-300 border-4 mx-auto max-w-full`}
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABtJREFUGFdj3Lt3738nJycGxv/////ft28fAwBbawo1G1p8AgAAAABJRU5ErkJggg==");
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
        background-repeat: repeat;
        background-size: 20px;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABtJREFUGFdjfPfu3X9BQUEGxv////9///49AwBfcArIPbKUHwAAAABJRU5ErkJggg==');
    `;

    return (
        <div>
            <BackgroundImage>
                <div css={tw`overflow-hidden bg-gray-100 font-medium text-center mx-auto w-full py-1 rounded-t-md`}>
                    {name}
                </div>
                <Suspense fallback={<></>}>
                    <Async promiseFn={() => skinImage(skin)}>
                        {({ data, isLoading }: { data: string; isLoading: boolean }) => {
                            return isLoading ? (
                                <></>
                            ) : (
                                <img src={data} alt={'Minecraft Skin'} css={tw`max-w-full`} width={250} height={400} />
                            );
                        }}
                    </Async>
                </Suspense>
            </BackgroundImage>
        </div>
    );
}
