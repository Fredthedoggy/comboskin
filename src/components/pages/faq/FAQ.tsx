import { css } from 'styled-components';
import tw from 'twin.macro';
import { FaqInput } from './FaqInput';
import { Link } from 'react-router-dom';
import React from 'react';

export default function FAQ() {
    return (
        <div
            css={css`
                ${tw`m-3 md:mx-auto flex flex-col`} max-width: 800px
            `}
        >
            <FaqInput question={'What is ComboSkin?'}>
                ComboSkin is a free-to-use online web-based tool that merges multiple minecraft skins into one skin,
                entirely for fun, created by Fredthedoggy
            </FaqInput>

            <FaqInput question={'How do I change the preview (homepage) skins?'}>
                Head to&nbsp;
                <span css={tw`underline text-gray-700`}>
                    <Link to={'/settings'}>the Settings page</Link>
                </span>
                , by clicking the head in the upper right
            </FaqInput>
            <FaqInput question={'Do you have an API?'}>
                Currently, the page is entirely client-sided, which means that there is no API to interact with (sorry!)
                We are currently working on a public API, but with no ETA
            </FaqInput>
            <FaqInput question={'Can I get support?'}>
                Of course! join&nbsp;
                <a css={tw`underline text-gray-700`} href={'https://discord.gg/Ssem4bQMZz'}>
                    discord.gg/Ssem4bQMZz
                </a>
                &nbsp;for support
            </FaqInput>

            <FaqInput question={'How do I create a custom combo?'}>
                Head over to&nbsp;
                <span css={tw`underline text-gray-700`}>
                    <Link to={'/custom'}>the "Custom Combo" page</Link>
                </span>
                &nbsp; to create your own!
            </FaqInput>
            <FaqInput question={'What is a skin mask?'}>
                A skin mask is an overlay for your skin, to add something like Sunglasses, a Mask, or something like
                false diamond-armor
            </FaqInput>
            <FaqInput question={'How do I create a custom combo?'}>
                Head over to&nbsp;
                <span css={tw`underline text-gray-700`}>
                    <Link to={'/custom'}>the "Custom Combo" page</Link>
                </span>
                &nbsp; to create your own!
            </FaqInput>
        </div>
    );
}
