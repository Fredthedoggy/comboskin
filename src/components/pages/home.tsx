import { ComboAPI } from '../../types';
import tw from 'twin.macro';
import React, { Suspense } from 'react';
import { Async } from 'react-async';
import SkinMerger from '../../SkinMerger';
import Gridtile from './skins/gridtile';
import { css } from 'styled-components';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Home({ data }: { data: ComboAPI[] }) {
    return (
        <div css={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6`}>
            {data.map((image) => {
                return (
                    <div key={image.short}>
                        <Suspense fallback={<></>}>
                            <Async
                                promiseFn={async () =>
                                    (await SkinMerger(
                                        image,
                                        ...Array.from(Array(image.amount).keys()).map(
                                            (n) => 'https://mc-heads.net/skin/' + localStorage.getItem('skin' + n),
                                        ),
                                    )) ?? ''
                                }
                            >
                                {({ data, isLoading }: { data: string; isLoading: boolean }) => {
                                    return (
                                        <Gridtile
                                            skin={isLoading ? undefined : data}
                                            display={image.name}
                                            short={image.short}
                                            to={'view'}
                                        />
                                    );
                                }}
                            </Async>
                        </Suspense>
                    </div>
                );
            })}
            <Link to={'/other'}>
                <div
                    css={css`
                        height: 444px;
                        width: 258px;
                        ${tw`rounded-lg shadow-md border-gray-200 border-4 mx-auto flex`}
                    `}
                >
                    <span css={tw`m-auto text-gray-500 flex flex-col text-lg`}>
                        Other Effects
                        <span css={tw`mx-auto mt-2`}>
                            <FontAwesomeIcon icon={faDice} size={'2x'} />
                        </span>
                    </span>
                </div>
            </Link>
        </div>
    );
}
