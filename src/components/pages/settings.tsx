import React, { Suspense } from 'react';
import tw from 'twin.macro';
import axios, { AxiosResponse } from 'axios';
import { Async } from 'react-async';
import { Input } from './Input';

export interface playerDB {
    data: { player: { username?: string; id?: string } };
    success: boolean;
}

export default function Settings() {
    return (
        <div css={tw`p-4 mt-10 w-max mx-auto bg-gray-200 rounded-lg`}>
            {[
                { name: 'skin0', display: 'Default Skin Name' },
                { name: 'skin1', display: 'Default Skin 2' },
                { name: 'skin2', display: 'Default Skin 3' },
                { name: 'skin3', display: 'Default Skin 4' },
                { name: 'skin4', display: 'Default Skin 5' },
                { name: 'skin5', display: 'Default Skin 6' },
                { name: 'skin6', display: 'Default Skin 7' },
                { name: 'skin7', display: 'Default Skin 8' },
                { name: 'skin8', display: 'Default Skin 9' },
                { name: 'skin9', display: 'Default Skin 10' },
            ].map((type) => {
                return (
                    <Suspense key={type.name} fallback={<></>}>
                        <Async
                            promiseFn={async () =>
                                await axios
                                    .get('https://playerdb.co/api/player/minecraft/' + localStorage.getItem(type.name))
                                    .catch((error) => error.response)
                            }
                        >
                            {({ data, isLoading }: { data: AxiosResponse<playerDB>; isLoading: boolean }) => {
                                return isLoading ? (
                                    <></>
                                ) : (
                                    <Input
                                        display={type.display}
                                        name={type.name}
                                        uuid={data.data.data.player.id ?? ''}
                                        initial={
                                            (data.data.success
                                                ? data.data.data.player.username
                                                : 'da8a8993-adfa-4d29-99b1-9d0f62fbb78d') ??
                                            'da8a8993-adfa-4d29-99b1-9d0f62fbb78d'
                                        }
                                    />
                                );
                            }}
                        </Async>
                    </Suspense>
                );
            })}
        </div>
    );
}

