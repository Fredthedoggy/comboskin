import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Gridtile from './components/pages/skins/gridtile';
import { default as axios } from 'axios';
import { decompress } from 'compress-json';
import { ApiData } from './types';
import { Async } from 'react-async';
import SkinMerger from './SkinMerger';
import Settings from './components/pages/settings';
import tw from 'twin.macro';
import Navbar from './components/navbar';
import Viewer from './components/pages/viewer/viewer';

export default function PageRouter() {
    const [data, setData] = useState<ApiData[] | undefined>(undefined);
    useEffect(() => {
        axios.get('/data.json').then((r) => {
            setData(decompress(r.data));
        });
    }, []);
    const skins = [
        'f8dbbe70-0b77-44ab-8898-fe718ac81d50',
        'da8a8993-adfa-4d29-99b1-9d0f62fbb78d',
        '35b74283-d9d4-4998-aa24-a9964c0f088e',
        '5c22897f-d31e-4aa4-9c97-a3ef0b5e0008',
        'b876ec32-e396-476b-a115-8438d83c67d4',
        '069a79f4-44e9-4726-a5be-fca90e38aaf5',
        'd9afca45-0bb2-4419-86aa-8ef9030eed55',
        '4232c61f-56db-4d4c-bdc2-4dbd406a3575',
        '094b0779-992c-4fac-90f5-fa839dc77dbc',
        '8667ba71-b85a-4004-af54-457a9734eed7',
    ];
    Array.from(Array(10).keys()).forEach((n) => {
        if (!localStorage.getItem('skin' + n)) localStorage.setItem('skin' + n, skins[n]);
    });
    return (
        <BrowserRouter>
            <Navbar />
            {data && (
                <Switch>
                    <Route path={'/'} exact>
                        <div css={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-6`}>
                            {data.map((image) => {
                                return (
                                    <div key={image.short}>
                                        <Suspense fallback={<></>}>
                                            <Async
                                                promiseFn={async () =>
                                                    (await SkinMerger(
                                                        image,
                                                        ...Array.from(Array(10).keys()).map(
                                                            (n) =>
                                                                'https://crafatar.com/skins/' +
                                                                localStorage.getItem('skin' + n),
                                                        ),
                                                    )) ?? ''
                                                }
                                            >
                                                {({ data, isLoading }: { data: string; isLoading: boolean }) => {
                                                    return isLoading ? (
                                                        <></>
                                                    ) : (
                                                        <Gridtile skin={data} display={image.name} short={image.short}/>
                                                    );
                                                }}
                                            </Async>
                                        </Suspense>
                                    </div>
                                );
                            })}
                        </div>
                    </Route>
                    <Route path={'/settings'}>
                        <Settings />
                    </Route>
                    <Route
                        path={'/view/:combo'}
                        render={({ match }) => {
                            const combo = match.params.combo;
                            const interData = data.filter((d) => d.short === combo)[0];
                            return interData ? <Viewer combo={combo} skinDetails={interData} /> : <>404</>;
                        }}
                    />
                    <Route path={'*'}>
                        <div>404</div>
                    </Route>
                </Switch>
            )}
        </BrowserRouter>
    );
}
