import tw from 'twin.macro';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMask, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { css } from 'styled-components';
import * as React from 'react';
import { useState } from 'react';

export default function Navbar() {
    const [showSearchBar, setShowSearchBar] = useState(false);

    function NavElement({
        icon,
        to,
        children,
        onClick,
    }: {
        icon?: IconProp;
        to?: string;
        children?: React.ReactNode;
        onClick?: () => void;
    }) {
        function Icon() {
            return (
                <div
                    onClick={onClick}
                    css={css`
                        ${tw`bg-gray-200 hover:bg-gray-500 flex content-center`}
                        ${to && window.location.pathname === to && tw`bg-gray-400`}
                    `}
                >
                    {children}
                    {icon && (
                        <div
                            css={tw`m-auto object-scale-down w-14 h-14 flex content-center hover:bg-gray-500 hover:text-gray-200`}
                        >
                            <div css={tw`m-auto`}>
                                <FontAwesomeIcon icon={icon} size={'lg'} />
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (to) {
            return (
                <Link to={to}>
                    <Icon />
                </Link>
            );
        } else {
            return (
                <div css={tw`hover:cursor-pointer`}>
                    <Icon />
                </div>
            );
        }
    }

    return (
        <>
            <div css={tw`text-gray-700 h-14 w-full bg-gray-200 flex flex-row`}>
                <Link to={'/'} css={tw`my-auto mx-3 hidden sm:block`}>
                    <span css={tw`text-3xl font-semibold`}>ComboSkin</span>
                </Link>
                <NavElement to={'/'} icon={faHome} />
                <NavElement icon={faUserPlus} />
                <NavElement icon={faMask} />
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
