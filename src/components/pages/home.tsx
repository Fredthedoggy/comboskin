import { ApiData } from '../../types';
import tw from 'twin.macro';
import React, { Suspense } from 'react';
import { Async } from 'react-async';
import SkinMerger from '../../SkinMerger';
import Gridtile from './skins/gridtile';

export default function Home({ data }: { data: ApiData[] }) {
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
                                            (n) => 'https://crafatar.com/skins/' + localStorage.getItem('skin' + n),
                                        ),
                                    )) ?? ''
                                }
                            >
                                {({ data, isLoading }: { data: string; isLoading: boolean }) => {
                                    return isLoading ? (
                                        <></>
                                    ) : (
                                        <Gridtile skin={data} display={image.name} short={image.short} />
                                    );
                                }}
                            </Async>
                        </Suspense>
                    </div>
                );
            })}
        </div>
    );
}
