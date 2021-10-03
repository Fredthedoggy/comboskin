import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { default as axios } from 'axios';
import { decompress } from 'compress-json';
import { ApiData } from './types';
import Navbar from './components/navbar';
import Viewer from './components/pages/viewer/viewer';
import Home from './components/pages/home';
import tw from 'twin.macro';
import Custom from './components/pages/custom/Custom';
import Masks from './components/pages/Masks';
import { Analytics } from './Analytics';
import FAQ from './components/pages/faq/FAQ';
import Settings from './components/pages/settings/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import OtherPage from "./components/pages/custom/OtherPage";
import Other from "./components/pages/other";
import CustomPage from "./components/pages/custom/CustomPage";

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
    const [uuid, setUuid] = useState(localStorage.getItem('skin0') ?? 'f8dbbe70-0b77-44ab-8898-fe718ac81d50');
    return (
        <BrowserRouter>
            <Analytics />
            <div css={tw`flex flex-col h-screen`}>
                <Navbar uuid={uuid} />
                {data && (
                    <Switch>
                        <Route path={'/'} exact>
                            <Home data={data} />
                        </Route>
                        <Route path={'/settings'} exact>
                            <Settings setUuid={setUuid} />
                        </Route>
                        <Route path={'/faq'} exact>
                            <FAQ />
                        </Route>
                        <Route path={'/custom'} exact>
                            <Custom />
                        </Route>
                        <Route path={'/custom/other'} exact>
                            <OtherPage />
                        </Route>
                        <Route path={'/custom/combo'} exact>
                            <CustomPage />
                        </Route>
                        <Route path={'/masks'} exact>
                            <Masks />
                        </Route>
                        <Route path={'/other'} exact>
                            <Other />
                        </Route>
                        <Route
                            path={'/view/:combo'}
                            render={({ match }) => {
                                const combo = match.params.combo;
                                const interData = data.filter((d) => d.short === combo)[0];
                                return interData ? <Viewer combo={combo} skinDetails={interData} /> : <>404</>;
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
