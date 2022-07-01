import tw from 'twin.macro';
import React, {Suspense} from 'react';
import {Async} from 'react-async';
import Gridtile from './skins/gridtile';
import otherMerge, {customMarkup} from "../../effects/otherMerge";

export default function Other({data}: { data: customMarkup[] }) {
    return (
        <div css={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6`}>
            {data.map((image) => {
                return (
                    <div key={image.short}>
                        <Suspense fallback={<></>}>
                            <Async
                                promiseFn={async () =>
                                    (await otherMerge(
                                        image,
                                        ...Array.from(Array(image.skins).keys()).map(
                                            (n) => image.usernames && image.usernames[n.toString()] ? 'https://crafatar.com/skins/' + image.usernames[n] : 'https://crafatar.com/skins/' + localStorage.getItem('skin' + n),
                                        ),
                                    )) ?? ''
                                }
                            >
                                {({data, isLoading}: { data: string; isLoading: boolean }) => {
                                    return <Gridtile skin={isLoading ? undefined : data} display={image.name!}
                                                     short={image.short!} to={'other'}/>
                                }}
                            </Async>
                        </Suspense>
                    </div>
                );
            })}
        </div>
    );
}
