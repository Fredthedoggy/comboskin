import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { default as axios } from 'axios';
import { decompress } from 'compress-json';
import { ComboAPI } from './types';
import Navbar from './components/navbar';
import tw from 'twin.macro';
import { Analytics } from './Analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { customMarkup } from './effects/otherMerge';

const Settings = React.lazy(() => import('./components/pages/settings/settings'));
const OtherPage = React.lazy(() => import('./components/pages/custom/OtherPage'));
const Other = React.lazy(() => import('./components/pages/other'));
const OtherViewer = React.lazy(() => import('./components/pages/viewer/other'));
const FAQ = React.lazy(() => import('./components/pages/faq/FAQ'));
const Masks = React.lazy(() => import('./components/pages/Masks'));
const Custom = React.lazy(() => import('./components/pages/custom/Custom'));
const Home = React.lazy(() => import('./components/pages/home'));
const Viewer = React.lazy(() => import('./components/pages/viewer/viewer'));
const CustomPage = React.lazy(() => import('./components/pages/custom/CustomPage'));

export default function PageRouter() {
    const [comboData, setComboData] = useState<ComboAPI[] | undefined>(undefined);
    const [otherData, setOtherData] = useState<customMarkup[] | undefined>(undefined);

    useEffect(() => {
        axios.get('/data.json').then((r) => {
            const data = decompress(r.data);
            setComboData(data.combo);
            setOtherData(data.other);
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
    const [uuid, setUuid] = useState(localStorage.getItem('skin0') ?? 'f8dbbe70-0b77-44ab-8898-fe718ac81d50');
    return (
        <BrowserRouter>
            <Analytics />
            <div css={tw`flex flex-col h-screen`}>
                <Navbar uuid={uuid} />
                {comboData && otherData && (
                    <Switch>
                        <Route path={'/'} exact>
                            <Suspense fallback={<></>}>
                                <Home data={comboData} />
                            </Suspense>
                        </Route>
                        <Route path={'/settings'} exact>
                            <Suspense fallback={<></>}>
                                <Settings setUuid={setUuid} />
                            </Suspense>
                        </Route>
                        <Route path={'/faq'} exact>
                            <Suspense fallback={<></>}>
                                <FAQ />
                            </Suspense>
                        </Route>
                        <Route path={'/custom'} exact>
                            <Suspense fallback={<></>}>
                                <Custom />
                            </Suspense>
                        </Route>
                        <Route path={'/custom/other'} exact>
                            <Suspense fallback={<></>}>
                                <OtherPage />
                            </Suspense>
                        </Route>
                        <Route path={'/custom/combo'} exact>
                            <Suspense fallback={<></>}>
                                <CustomPage />
                            </Suspense>
                        </Route>
                        <Route path={'/masks'} exact>
                            <Suspense fallback={<></>}>
                                <Masks />
                            </Suspense>
                        </Route>
                        <Route path={'/other'} exact>
                            <Suspense fallback={<></>}>
                                {() => {
                                    console.log(otherData)
                                    return <></>
                                }}
                                <Other data={otherData} />
                            </Suspense>
                        </Route>
                        <Route
                            path={'/view/:combo'}
                            render={({ match }) => {
                                const combo = match.params.combo;
                                const interData = comboData.filter((d) => d.short === combo)[0];
                                return interData ? (
                                    <Suspense fallback={<></>}>
                                        <Viewer combo={combo} skinDetails={interData} />
                                    </Suspense>
                                ) : (
                                    <>404</>
                                );
                            }}
                            exact
                        />
                        <Route
                            path={'/other/:other'}
                            render={({ match }) => {
                                const other = match.params.other;
                                const interData = otherData.filter((d) => d.short === other)[0];
                                return interData ? (
                                    <Suspense fallback={<></>}>
                                        <OtherViewer skinDetails={interData}  other={other}/>
                                    </Suspense>
                                ) : (
                                    <>404</>
                                );
                            }}
                            exact
                        />
                        <Route path={'*'}>
                            <div>404</div>
                        </Route>
                    </Switch>
                )}
                <div css={tw`h-20 w-full mt-auto`}>
                    <div css={tw`text-gray-600 w-full bg-gray-200 flex flex-row content-center h-14 mt-6`}>
                        <span css={tw`m-auto`}>
                            © Copyright 2021{new Date().getFullYear() !== 2021 ? ' - ' + new Date().getFullYear() : ''}
                            &nbsp;Fredthedoggy
                        </span>
                        <a css={tw`absolute right-0`} href={'https://discord.gg/Ssem4bQMZz'}>
                            <span css={tw`w-14 h-14 flex`}>
                                <span css={tw`m-auto`}>
                                    <FontAwesomeIcon icon={faDiscord} size={'lg'} />
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
