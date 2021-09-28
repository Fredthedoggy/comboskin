import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Icon({
    icon,
    to,
    children,
    onClick,
    right,
}: {
    icon?: IconProp;
    to?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    right?: boolean;
}) {
    const location = useLocation();
    return (
        <div
            onClick={onClick}
            css={css`
                ${tw`bg-gray-200 hover:bg-gray-500 hover:text-gray-200 flex content-center`}
                ${to && location.pathname === to && tw`bg-gray-400`}
            `}
        >
            {!right && children}
            {icon && (
                <div css={tw`m-auto object-scale-down w-14 h-14 flex content-center`}>
                    <div css={tw`m-auto`}>
                        <FontAwesomeIcon icon={icon} size={'lg'} />
                    </div>
                </div>
            )}
            {right && children}
        </div>
    );
}
