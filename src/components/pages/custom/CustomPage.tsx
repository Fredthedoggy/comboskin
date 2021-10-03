import CustomCombiner from './CustomCombiner';
import { useState } from 'react';
import tw from 'twin.macro';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { css } from 'styled-components';

function isJson(string: string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

export default function CustomPage() {
    const [json, setJson] = useState<string>('');
    const [validJson, setValidJson] = useState<any>({});
    return (
        <div>
            <Editor
                onValueChange={(json) => {
                    setJson(json);
                    if (isJson(json)) {
                        setValidJson(JSON.parse(json));
                    }
                }}
                value={json}
                highlight={(code) => (
                    <Highlight {...defaultProps} theme={theme} code={code} language={'json'}>
                        {({ tokens, getLineProps, getTokenProps }) => (
                            <>
                                {tokens.map((line, i) => (
                                    <div {...getLineProps({ line, key: i })}>
                                        {line.map((token, key) => (
                                            <span {...getTokenProps({ token, key })} />
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </Highlight>
                )}
                padding={10}
                css={css`
                    box-sizing: border-box;
                    font-family: 'Dank Mono', 'Fira Code', monospace;
                    ${tw`bg-blue-900 m-4 rounded-md overflow-y-scroll`}
                `}
            />
            {!isJson(json) && (
                <div css={tw`w-full`}>
                    <div css={tw`p-2 m-2 bg-red-600 rounded-md`}>Invalid JSON</div>
                </div>
            )}
            <CustomCombiner json={validJson} />
        </div>
    );
}
