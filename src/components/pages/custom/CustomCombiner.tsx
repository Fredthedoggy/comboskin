import React, { useEffect, useState } from 'react';
import ViewPage from '../../ViewPage';
import { ComboAPI } from '../../../types';
import SkinMerger from '../../../SkinMerger';

const steve =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==';
export default function CustomCombiner({ skinDetails }: { combo: string; skinDetails: ComboAPI }) {
    const [skinData, setSkinData] = useState<string>(steve);

    const [inputs, setInputs] = useState(
        Array.from(Array(skinDetails.amount).keys()).map((n) => localStorage.getItem('skin' + n) ?? ''),
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

    useEffect(() => {
        async function effect() {
            setInputs(Array.from(Array(skinDetails.amount).keys()).map((n) => localStorage.getItem('skin' + n) ?? ''));
            setSkinData(
                (await SkinMerger(skinDetails, ...inputs.map((input) => 'https://mc-heads.net/skin/' + input))) ??
                    steve,
            );
        }

        effect().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skinDetails]);

    return (
        <ViewPage
            name={'Custom Skin'}
            updateSkin={async () => {
                setSkinData(
                    (await SkinMerger(skinDetails, ...inputs.map((input) => 'https://mc-heads.net/skin/' + input))) ??
                        steve,
                );
            }}
            inputs={inputs}
            setInputs={setInputs}
            skinData={skinData}
        />
    );
}
