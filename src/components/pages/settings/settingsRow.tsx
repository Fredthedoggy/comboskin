import React, { useState } from 'react';
import { Input } from '../Input';
import { playerDB } from './settings';

export function SettingsRow({
    type,
    data,
    setNavbarUuid,
}: {
    type: { name: string; display: string };
    data: playerDB;
    setNavbarUuid?: (uuid: string) => void;
}) {
    const [uuid, setUuid] = useState(data.data.player.id ?? '');
    return (
        <Input
            display={type.display}
            name={type.name}
            uuid={uuid}
            setUUID={(uuid) => {
                setUuid(uuid);
                if (setNavbarUuid) setNavbarUuid(uuid);
            }}
            initial={
                (data.success ? data.data.player.username : 'da8a8993-adfa-4d29-99b1-9d0f62fbb78d') ??
                'da8a8993-adfa-4d29-99b1-9d0f62fbb78d'
            }
        />
    );
}
