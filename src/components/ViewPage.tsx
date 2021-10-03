import tw from 'twin.macro';
import Skinview from './pages/viewer/skinview';
import React, { Suspense } from 'react';
import { Async } from 'react-async';
import axios, { AxiosResponse } from 'axios';
import { playerDB } from './pages/settings/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faExternalLinkAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import download from 'downloadjs';
import { css } from 'styled-components';
import { useForm } from 'react-hook-form';

export default function ViewPage({
    skinData,
    updateSkin,
    inputs,
    setInputs,
}: {
    skinData: string;
    updateSkin: () => void;
    inputs: string[];
    setInputs: (inputs: string[]) => void;
}) {
    const { register, handleSubmit } = useForm();

    return (
        <div css={tw`mx-auto my-8 h-max w-max flex flex-col md:flex-row`}>
            <Skinview size={{ height: 600, width: 400 }} skin={{ skinUrl: skinData, model: 'auto-detect' }} />
            <div>
                {inputs.map((i, id) => {
                    return (
                        <Suspense
                            key={id}
                            fallback={
                                <div css={tw`w-full m-4 flex flex-row content-center  py-1 px-2 h-10 rounded-md`} />
                            }
                        >
                            <Async
                                promiseFn={async () =>
                                    await axios
                                        .get('https://playerdb.co/api/player/minecraft/' + i)
                                        .catch((error) => error.response)
                                }
                            >
                                {({ data, isLoading }: { data: AxiosResponse<playerDB>; isLoading: boolean }) => {
                                    return isLoading ? (
                                        <form
                                            css={tw`w-full m-4 flex flex-row content-center`}
                                            onSubmit={(event) => event.preventDefault()}
                                        >
                                            <input
                                                type={'text'}
                                                css={tw`h-10 rounded-md hover:outline-none focus:outline-none bg-gray-100 py-1 px-2`}
                                            />
                                            <button
                                                type="submit"
                                                css={tw`px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none ml-2`}
                                            >
                                                <FontAwesomeIcon icon={faSync} />
                                            </button>
                                        </form>
                                    ) : (
                                        <form
                                            css={tw`w-full m-4 flex flex-row content-center`}
                                            onSubmit={handleSubmit(async (input) => {
                                                const val = input[id];
                                                const data: playerDB = (
                                                    await axios
                                                        .get('https://playerdb.co/api/player/minecraft/' + val)
                                                        .catch((error) => error.response)
                                                ).data;
                                                if (data.success) {
                                                    const newVal = inputs;
                                                    newVal[id] = data.data.player.id ?? '';
                                                    setInputs(newVal);
                                                    updateSkin();
                                                } else {
                                                    alert('Error, Invalid Username / UUID');
                                                }
                                            })}
                                        >
                                            <input
                                                type={'text'}
                                                defaultValue={
                                                    (data.data.success
                                                        ? data.data.data.player.username
                                                        : 'da8a8993-adfa-4d29-99b1-9d0f62fbb78d') ??
                                                    'da8a8993-adfa-4d29-99b1-9d0f62fbb78d'
                                                }
                                                {...register(id.toString())}
                                                css={tw`h-10 rounded-md hover:outline-none focus:outline-none bg-gray-100 py-1 px-2`}
                                            />
                                            <button
                                                type="submit"
                                                css={tw`px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none ml-2`}
                                            >
                                                <FontAwesomeIcon icon={faSync} />
                                            </button>
                                        </form>
                                    );
                                }}
                            </Async>
                        </Suspense>
                    );
                })}
                <div css={tw`mx-2 flex`}>
                    <button
                        onClick={() => {
                            download(skinData ?? '', 'MergedSkin', 'image/png');
                        }}
                        css={tw`m-2 px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none flex-shrink flex-grow`}
                    >
                        Download&nbsp;
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                    <button
                        //onClick={() => {window.open('https://www.minecraft.net/en-us/profile/skin/remote?url=' + skinData);}}
                        css={css`
                            ${tw`m-2 px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none flex-shrink flex-grow
                            `}
                            overflow: hidden;
                            position: relative;
                        `}
                    >
                        <span
                            css={css`
                                ${tw`bg-red-500 text-xs`}
                                margin: 0;
                                color: white;
                                padding: 1px 0;
                                position: absolute;
                                top: 0;
                                right: 0;
                                transform: translateX(13%) translateY(0%) rotate(30deg);
                                transform-origin: top left;

                                :before,
                                :after {
                                    content: '';
                                    position: absolute;
                                    top: 0;
                                    margin: 0 -1px;
                                    width: 100%;
                                    height: 100%;
                                    ${tw`bg-red-500`}
                                }

                                :before {
                                    right: 100%;
                                }

                                :after {
                                    left: 100%;
                                }
                            `}
                        >
                            Soon™
                        </span>
                        Apply&nbsp;
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
}
