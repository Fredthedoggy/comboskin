import React, { useEffect, useState } from 'react';
import ViewPage from '../../ViewPage';
import small, {customMarkup} from "../../../effects/small";

const steve =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==';
export default function OtherViewer({ skinDetails }: { other: string; skinDetails: customMarkup }) {
    const [skinData, setSkinData] = useState<string>(steve);

    const [inputs, setInputs] = useState(
        Array.from(Array(skinDetails.skins).keys()).map((n) => localStorage.getItem('skin' + n) ?? ''),
    );

    useEffect(() => {
        async function effect() {
            setSkinData(
                (await small(skinDetails, ...inputs.map((input) => 'https://crafatar.com/skins/' + input))) ??
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
                    (await small(skinDetails, ...inputs.map((input) => 'https://crafatar.com/skins/' + input))) ??
                    steve,
                );
            }}
            name={skinDetails.name ?? ''}
            author={skinDetails.author}
            inputs={inputs}
            setInputs={setInputs}
            skinData={skinData}
        />
    );
}
