import React, { useRef, useState } from 'react';
import tw from 'twin.macro';
import ViewPage from '../../ViewPage';
import SkinMerger from '../../../SkinMerger';
import generateMerge from '../../../effects/generateMerge';
import { useForm } from 'react-hook-form';
import GenerateOverlay from '../../../effects/generateOverlay';

//  <CustomCombiner json={validJson} />

const steve =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIRJREFUeF7t1QERADAMArHi33SFfOagHBm7+Fv8/hOABsQTQCBeAJ8gAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgAAC8QQQiBfACiCAQDwBBOIFsAIIIBBPAIF4AawAAgjEE0AgXgArgECdwANo2ABBrP9ggQAAAABJRU5ErkJggg==';

export default function CustomPage() {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>('Invalid PNG Image');
    const [selected, setSelected] = useState('No File Chosen');
    const [skinData, setSkinData] = useState<
        | {
              image: Record<number, Record<number, number>>;
              amount: number;
          }
        | undefined
    >(undefined);
    const inputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const [inputs, setInputs] = useState<string[]>([]);
    const { register, watch } = useForm();

    return (
        <div>
            <div css={tw`flex flex-row`}>
                <input
                    type={'file'}
                    accept={'image/png'}
                    ref={inputRef}
                    css={tw`hidden`}
                    onChange={() => {
                        if (inputRef.current.value === '') return;
                        const reader = new FileReader();
                        reader.addEventListener(
                            'load',
                            async () => {
                                const image = new Image();
                                image.crossOrigin = 'anonymous';
                                if (typeof reader.result !== 'string') {
                                    setError('Error Parsing Image');
                                    return;
                                }
                                image.src = reader.result;
                                await new Promise((resolve) => {
                                    image.onload = loaded;

                                    function loaded() {
                                        resolve(null);
                                    }
                                });
                                if (image.height !== 64 || image.width !== 64) {
                                    setError('Invalid Dimensions');
                                    return;
                                }
                                setError(undefined);
                                let uri = reader.result;
                                if (watch('overlay')) {
                                    uri = await GenerateOverlay(uri);
                                }
                                const data = await generateMerge(uri);
                                if (!data) {
                                    setError('Merging Failed...');
                                    return;
                                }
                                setSkinData(data);
                                const inputs = Array.from(Array(data.amount).keys()).map(
                                    (n) => localStorage.getItem('skin' + n) ?? '',
                                );
                                setInputs(inputs);

                                setImage(
                                    (await SkinMerger(
                                        data,
                                        ...inputs.map((input) => 'https://mc-heads.net/skin/' + input),
                                    )) ?? steve,
                                );
                            },
                            false,
                        );

                        if (inputRef?.current?.files && inputRef.current.files[0]) {
                            reader.readAsDataURL(inputRef.current.files[0]);
                        } else {
                            setError('Invalid PNG Image');
                        }
                        setSelected(inputRef.current.value.split('/').reverse()[0]);
                        inputRef.current.value = '';
                    }}
                />
                <button
                    css={tw`m-4 mr-2 px-2 py-1 rounded-md inline-block bg-gray-200`}
                    onClick={() => inputRef.current.click()}
                >
                    Select Image
                </button>
                <span css={tw`inline-block my-auto`}>{selected}</span>
                <span css={tw`inline-block ml-auto my-auto`}>Copy Main Skin to Overlay?</span>
                <input type={'checkbox'} css={tw`inline-block m-4 my-auto`} {...register('overlay')} />
            </div>
            {error && (
                <div css={tw`w-full`}>
                    <div css={tw`p-2 m-2 bg-red-600 rounded-md`}>{error}</div>
                </div>
            )}
            {image && skinData && (
                <ViewPage
                    name={'Custom Skin'}
                    skinData={image}
                    updateSkin={async () => {
                        setImage(
                            (await SkinMerger(
                                skinData,
                                ...inputs.map((input) => 'https://mc-heads.net/skin/' + input),
                            )) ?? steve,
                        );
                    }}
                    inputs={inputs}
                    setInputs={setInputs}
                />
            )}
        </div>
    );
}
