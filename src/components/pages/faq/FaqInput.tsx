import React from 'react';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'styled-components';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export function FaqInput({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <div css={tw`w-full rounded-md overflow-hidden my-2`}>
            <div css={tw`flex flex-row w-full bg-gray-200 text-center`}>
                <span css={tw`m-3 absolute`}>
                    <FontAwesomeIcon icon={faQuestion} />
                </span>
                <span css={tw`m-3 text-lg font-medium w-full`}>{question}</span>
            </div>
            <div
                css={css`
                    ${tw`h-full w-full overflow-hidden w-full bg-gray-100 flex`}
                `}
            >
                <span
                    css={css`
                        ${tw`m-2 relative text-center w-full`}
                    `}
                >
                    {children}
                </span>
            </div>
        </div>
    );
}
