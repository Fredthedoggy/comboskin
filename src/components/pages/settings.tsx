import React, { useState, Suspense } from 'react';
import tw from 'twin.macro';
import axios, { AxiosResponse } from 'axios';
import { Async } from 'react-async';

interface playerDB {
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

function Input({ initial, name, display }: { initial: string; name: string; display: string }) {
    const [value, setValue] = useState(initial);
    let textInput = React.createRef<HTMLInputElement>();

    return (
        <form
            css={tw`w-full m-4`}
            onSubmit={async (e) => {
                e.preventDefault();

                const data: playerDB = (
                    await axios
                        .get('https://playerdb.co/api/player/minecraft/' + value)
                        .catch((error) => error.response)
                ).data;
                if (data.success) {
                    localStorage.setItem(name, data.data.player.id!);
                    window.location.reload();
                } else {
                    alert('Error, Invalid Username / UUID');
                }
            }}
        >
            <label css={tw`w-full text-2xl my-1`}>
                <div css={tw`text-center`}>{display}</div>
            </label>
            <input
                ref={textInput}
                type={'text'}
                value={value}
                onChange={() => setValue(textInput.current?.value ?? 'da8a8993-adfa-4d29-99b1-9d0f62fbb78d')}
                css={tw`h-10 py-2 px-2 rounded-md hover:outline-none focus:outline-none mx-3`}
            />
            <input
                type="submit"
                css={tw`px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none`}
                value={'Update Skin'}
            />
        </form>
    );
}
