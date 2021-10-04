import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import {faDice, faHome, faMask, faQuestion, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-components';
import * as React from 'react';
import { useState } from 'react';
import { NavElement } from './NavElement';

//                    <NavElement icon={faSearch} onClick={() => setShowSearchBar(!showSearchBar)}>
//                         <input
//                             type="text"
//                             placeholder="Search.."
//                             css={tw`w-72 h-4/5 rounded-lg my-auto p-3 ml-2 hover:outline-none focus:outline-none hidden lg:block`}
//                         />
//                     </NavElement>

export default function Navbar({ uuid }: { uuid: string }) {
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <>
            <div css={tw`text-gray-700 h-14 w-full bg-gray-200 flex flex-row`}>
                <Link to={'/'} css={tw`my-auto mx-3 hidden sm:block`}>
                    <span css={tw`text-3xl font-semibold`}>ComboSkin</span>
                </Link>
                <div css={tw`sm:hidden`}>
                    <NavElement icon={faHome} to={'/'} right />
                </div>
                <NavElement icon={faQuestion} to={'/faq'} right>
                    <span css={tw`my-auto font-semibold text-lg mr-4 hidden lg:block`}>FAQ</span>
                </NavElement>
                <NavElement icon={faUserPlus} to={'/custom'} right>
                    <span css={tw`my-auto font-semibold text-lg mr-4 hidden lg:block`}>Custom Combo</span>
                </NavElement>
                <NavElement icon={faMask} to={'/masks'} right>
                    <span css={tw`my-auto font-semibold text-lg mr-4 hidden lg:block`}>Skin Masks</span>
                </NavElement>
                <NavElement icon={faDice} to={'/other'} right>
                    <span css={tw`my-auto font-semibold text-lg mr-4 hidden lg:block`}>Other Effects</span>
                </NavElement>
                <div css={tw`ml-auto flex flex-row`}>
                    <NavElement to={'/settings'}>
                        <div css={tw`m-auto object-scale-down w-14 h-14 flex content-center`}>
                            <img
                                alt={'User Icon'}
                                src={'https://crafatar.com/avatars/' + uuid + '?overlay'}
                                css={tw`rounded-sm h-8 w-8 m-auto`}
                            />
                        </div>
                    </NavElement>
                </div>
            </div>
            <div
                css={css`
                    transition-property: height;
                    transition-duration: 1s;
                    ${tw`text-gray-700 h-0 hidden w-full bg-gray-200 flex flex-row`}
                    ${showSearchBar && tw`h-14 block lg:hidden lg:h-0`}
                `}
            >
                <div css={tw`mx-2 py-2`}>
                    <input
                        type="text"
                        placeholder="Search.."
                        css={`
                            transition-property: dis;
                            transition-duration: 1s;
                            ${tw`w-full h-full rounded-lg p-3 hover:outline-none focus:outline-none hidden`}
                            ${showSearchBar && tw`block`}
                        `}
                    />
                </div>
            </div>
        </>
    );
}
