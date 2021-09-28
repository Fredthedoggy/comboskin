import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './NavbarIcon';
import tw from 'twin.macro';

export function NavElement({
    icon,
    to,
    children,
    onClick,
    right
}: {
    icon?: IconProp;
    to?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    right?: boolean;
}) {
    if (to) {
        return (
            <Link to={to}>
                <Icon icon={icon} to={to} children={children} onClick={onClick} right={right}/>
            </Link>
        );
    } else {
        return (
            <div css={tw`hover:cursor-pointer`}>
                <Icon icon={icon} children={children} onClick={onClick} right={right}/>
            </div>
        );
    }
}
