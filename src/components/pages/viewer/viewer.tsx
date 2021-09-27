import SkinMerger from '../../../SkinMerger';
import { ApiData } from '../../../types';
import React, { Suspense, useEffect, useState } from 'react';
import { Async } from 'react-async';
import tw from 'twin.macro';
import Skinview from './skinview';
import axios, { AxiosResponse } from 'axios';
import { playerDB } from '../settings';
import { useForm } from 'react-hook-form';

export default function Viewer({ skinDetails }: { combo: string; skinDetails: ApiData }) {
    const [skinData, setSkinData] = useState<string | undefined>('');
    const [inputs, setInputs] = useState(
        Array.from(Array(skinDetails.amount).keys()).map((n) => localStorage.getItem('skin' + n) ?? ''),
    );
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        async function effect() {
            setSkinData(await SkinMerger(skinDetails, ...inputs.map((input) => 'https://crafatar.com/skins/' + input)));
        }

        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div css={tw`w-60`}>
                {inputs.map((i, id) => {
                    return (
                        <Suspense key={i} fallback={<></>}>
                            <Async
                                promiseFn={async () =>
                                    await axios
                                        .get('https://playerdb.co/api/player/minecraft/' + i)
                                        .catch((error) => error.response)
                                }
                            >
                                {({ data, isLoading }: { data: AxiosResponse<playerDB>; isLoading: boolean }) => {
                                    return isLoading ? (
                                        <></>
                                    ) : (
                                        <form
                                            css={tw`w-full m-4`}
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
                                                    setSkinData(
                                                        await SkinMerger(
                                                            skinDetails,
                                                            ...inputs.map(
                                                                (input) => 'https://crafatar.com/skins/' + input,
                                                            ),
                                                        ),
                                                    );
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
                                            />
                                            <input
                                                type="submit"
                                                css={tw`px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none`}
                                                value={'Update Skin'}
                                            />
                                        </form>
                                    );
                                }}
                            </Async>
                        </Suspense>
                    );
                })}
            </div>
            {skinData && (
                <Skinview size={{ height: 600, width: 400 }} skin={{ skinUrl: skinData, model: 'auto-detect' }} />
            )}
        </div>
    );
}
