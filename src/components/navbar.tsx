import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import {faMask, faQuestion, faSearch, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-components';
import * as React from 'react';
import { useState } from 'react';
import { NavElement } from './NavElement';

export default function Navbar() {
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <>
            <div css={tw`text-gray-700 h-14 w-full bg-gray-200 flex flex-row`}>
                <Link to={'/'} css={tw`my-auto mx-3 hidden sm:block`}>
                    <span css={tw`text-3xl font-semibold`}>ComboSkin</span>
                </Link>
                <NavElement icon={faQuestion} right><span css={tw`my-auto font-semibold text-lg mr-4`}>FAQ</span></NavElement>
                <NavElement icon={faUserPlus} right><span css={tw`my-auto font-semibold text-lg mr-4`}>Custom Combo</span></NavElement>
                <NavElement icon={faMask} right><span css={tw`my-auto font-semibold text-lg mr-4`}>Skin Masks</span></NavElement>
                <div css={tw`ml-auto flex flex-row`}>
                    <NavElement icon={faSearch} onClick={() => setShowSearchBar(!showSearchBar)}>
                        <input
                            type="text"
                            placeholder="Search.."
                            css={tw`w-72 h-4/5 rounded-lg my-auto p-3 ml-2 hover:outline-none focus:outline-none hidden md:block`}
                        />
                    </NavElement>
                    <NavElement to={'/settings'}>
                        <div css={tw`m-auto object-scale-down w-14 h-14 flex content-center`}>
                            <img
                                alt={'User Icon'}
                                src={
                                    'https://crafatar.com/avatars/' +
                                    (localStorage.getItem('skin0') ?? 'f8dbbe70-0b77-44ab-8898-fe718ac81d50')
                                }
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
                    ${showSearchBar && tw`h-14 block md:hidden md:h-0`}
                `}
            >
                <div css={tw`mx-2 py-2`}>
                    <input
                        type="text"
                        placeholder="Search.."
                        css={`
                            ${tw`w-full h-full rounded-lg p-3 hover:outline-none focus:outline-none hidden`} ${showSearchBar &&
                            tw`block`}
                        `}
                    />
                </div>
            </div>
        </>
    );
}
