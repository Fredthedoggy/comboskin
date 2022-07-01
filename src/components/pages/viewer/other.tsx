import React, { useEffect, useState } from 'react';
import ViewPage from '../../ViewPage';
import otherMerge, {customMarkup} from "../../../effects/otherMerge";

const steve =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==';
export default function OtherViewer({ skinDetails }: { other: string; skinDetails: customMarkup }) {
    const [skinData, setSkinData] = useState<string>(steve);
    const skins = window.location.hash && window.location.hash.length > 1 ? window.location.hash.slice(1).split('&'): []

    const [inputs, setInputs] = useState(
        Array.from(Array(skinDetails.skins).keys()).filter(n => !skinDetails.usernames || !skinDetails.usernames[n.toString()]).map((n) => skins[n] ?? localStorage.getItem('skin' + n) ?? ''),
    );

    useEffect(() => {
        async function effect() {
            setSkinData(
                (await otherMerge(skinDetails, ...inputs.map((input) => 'https://crafatar.com/skins/' + input), ...(!skinDetails.usernames ? [] : Object.values(skinDetails.usernames).map(u => 'https://crafatar.com/skins/' + u)))) ??
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
                    (await otherMerge(skinDetails, ...inputs.map((input) => 'https://crafatar.com/skins/' + input), ...(!skinDetails.usernames ? [] : Object.values(skinDetails.usernames).map(u => 'https://crafatar.com/skins/' + u)))) ??
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
