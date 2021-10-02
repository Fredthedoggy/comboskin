import tw from 'twin.macro';
import React, { Suspense } from 'react';
import { Async } from 'react-async';
import axios, { AxiosResponse } from 'axios';
import { SettingsRow } from './settingsRow';

export interface playerDB {
    data: { player: { username?: string; id?: string } };
    success: boolean;
}

export default function Settings({ setUuid }: { setUuid: (uuid: string) => void }) {
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
                                    <SettingsRow
                                        type={type}
                                        data={data.data}
                                        setNavbarUuid={type.name === 'skin0' ? setUuid : undefined}
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
