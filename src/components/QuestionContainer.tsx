import { Text } from '@fluentui/react';
import { Question } from '../models';
import { decodeHtml } from '../services/Helpers';
import { SanitizeHtml } from './SanitizeHtml';

export const QuestionContainer = (props: { question: Question }) => {
    return (
        <>
            <Text variant="xLarge">{decodeHtml(props.question.title)}</Text>
            <SanitizeHtml htmlString={decodeHtml(props.question.body)} />
        </>
    );
};
