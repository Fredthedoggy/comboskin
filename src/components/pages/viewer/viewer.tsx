import SkinMerger from '../../../SkinMerger';
import { ComboAPI } from '../../../types';
import React, { useEffect, useState } from 'react';
import ViewPage from '../../ViewPage';

const steve =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==';
export default function Viewer({ skinDetails }: { combo: string; skinDetails: ComboAPI }) {
    const [skinData, setSkinData] = useState<string>(steve);
    const skins = window.location.hash && window.location.hash.length > 1 ? window.location.hash.slice(1).split('&'): []

    const [inputs, setInputs] = useState(
        Array.from(Array(skinDetails.amount).keys()).map((n) => skins[n] ?? localStorage.getItem('skin' + n) ?? ''),
    );

    useEffect(() => {
        async function effect() {
            setSkinData(
                (await SkinMerger(skinDetails, ...inputs.map((input) => 'https://mc-heads.net/skin/' + input))) ??
                    steve,
            );
        }

        effect().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ViewPage
            updateSkin={async () => {
                setSkinData(
                    (await SkinMerger(skinDetails, ...inputs.map((input) => 'https://mc-heads.net/skin/' + input))) ??
                        steve,
                );
            }}
            name={skinDetails.name}
            inputs={inputs}
            setInputs={setInputs}
            skinData={skinData}
        />
    );
}
