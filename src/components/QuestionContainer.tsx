import { Stack, Text } from '@fluentui/react';
import { useParams } from 'react-router-dom';
import { Question } from '../models';

type QuestionProps = {};

export const QuestionContainer = (props: QuestionProps) => {
    const { question_id } = useParams();

    return (
        <Stack horizontalAlign="start" tokens={{ maxWidth: '100%' }}>
            <Text variant="large">{question_id}</Text>
        </Stack>
    );
};
