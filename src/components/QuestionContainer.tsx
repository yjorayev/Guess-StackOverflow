import { MessageBar, MessageBarType, Stack, Text } from '@fluentui/react';
import { useLocation } from 'react-router-dom';
import { Question } from '../models';

type QuestionProps = {};

export const QuestionContainer = (props: QuestionProps) => {
    const location = useLocation();
    const state = location.state as { question: Question };
    const question: Question = state?.question;

    return question ? (
        <Stack horizontalAlign="start" tokens={{ maxWidth: '100%' }}>
            <Text variant="large">{question.title}</Text>
        </Stack>
    ) : (
        <MessageBar messageBarType={MessageBarType.error}>Error loading the question.</MessageBar>
    );
};
