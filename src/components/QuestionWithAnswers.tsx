import {
    DefaultButton,
    DetailsList,
    Dialog,
    DialogFooter,
    DialogType,
    IColumn,
    IDialogContentProps,
    ISelectionOptions,
    MessageBar,
    MessageBarType,
    PrimaryButton,
    Selection,
    SelectionMode,
    Stack,
    StackItem,
    Text,
} from '@fluentui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Answer, Question } from '../models';
import { Api } from '../services/Api';
import { arrayShuffle, decodeHtml } from '../services/Helpers';
import { QuestionContainer } from './QuestionContainer';
import { SanitizeHtml } from './SanitizeHtml';
import { useConst } from '@fluentui/react-hooks';
import { Container } from './Container';

export const QuestionWithAnswers = () => {
    const [error, setError] = React.useState<string>();
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const [hideDialog, setHideDialog] = React.useState(true);
    const [selectedAnswer, setSelectedAnswer] = React.useState<Answer>();
    const [dialogContentProps, setDialogContentProps] = React.useState<IDialogContentProps>({
        type: DialogType.normal,
        title: '',
        subText: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { question: Question };
    const question: Question = state?.question;

    React.useEffect(() => {
        const getAnswers = async () => {
            let response = await Api.getAnswers(question.question_id);
            if (response.has_error) {
                setError(response.error_message);
            } else {
                setError(undefined);
            }

            const items = arrayShuffle(response.body.items!);
            setAnswers(items);
        };

        getAnswers();
    }, [question.question_id]);

    const columns: IColumn[] = [
        {
            key: 'body',
            name: 'Answer',
            fieldName: 'body',
            minWidth: 1000,
            calculatedWidth: 0,
            isMultiline: true,
            onRender: (item: Answer) => (
                <div style={{ borderBottom: '3px solid grey', paddingBottom: 35 }}>
                    <SanitizeHtml htmlString={decodeHtml(item.body)} />
                    <Text style={{ float: 'right' }}>answered by: {item.owner.display_name}</Text>
                </div>
            ),
        },
    ];

    const handleSelectionChanged = () => {
        const selected = selection.getSelection();
        if (selected && selected.length) {
            const answer = selected[0] as Answer;
            setSelectedAnswer(answer);
        } else {
            setSelectedAnswer(undefined);
        }
    };

    const checkAnswer = () => {
        if (selectedAnswer?.is_accepted) {
            setDialogContentProps({ ...dialogContentProps, title: 'Correct', subText: 'Your guess was correct!' });
        } else {
            setDialogContentProps({
                ...dialogContentProps,
                title: 'Inorrect',
                subText: 'Your guess was incorrect!',
            });
        }
        setHideDialog(false);
    };

    const selection = useConst(
        () =>
            new Selection({
                onSelectionChanged: handleSelectionChanged,
                getKey: (item: Answer) => item.answer_id,
                selectionMode: SelectionMode.single,
            } as ISelectionOptions)
    );

    const showQuestions = () => {
        navigate({ pathname: '/questions' });
    };

    return (
        <Container error={error}>
            question ? (
            <>
                <PrimaryButton
                    onClick={checkAnswer}
                    style={{ position: 'sticky', top: 10, float: 'right' }}
                    disabled={!selectedAnswer}
                >
                    Check Answer
                </PrimaryButton>

                <Stack horizontalAlign="start" tokens={{ maxWidth: '100%', childrenGap: 10, padding: 10 }}>
                    <QuestionContainer question={question}></QuestionContainer>
                    <StackItem align="center">
                        <Text variant="large">Pick your answer:</Text>
                    </StackItem>
                    <DetailsList
                        items={answers}
                        key="questionsList"
                        columns={columns}
                        compact={true}
                        selectionMode={SelectionMode.single}
                        isHeaderVisible={false}
                        selection={selection}
                    />

                    <Dialog
                        hidden={hideDialog}
                        onDismiss={() => setHideDialog(true)}
                        dialogContentProps={dialogContentProps}
                    >
                        <DialogFooter>
                            <PrimaryButton onClick={showQuestions} text="Show questions" />
                            {!selectedAnswer?.is_accepted && (
                                <DefaultButton onClick={() => setHideDialog(true)} text="Try again" />
                            )}
                        </DialogFooter>
                    </Dialog>
                </Stack>
            </>
            ) : (<MessageBar messageBarType={MessageBarType.error}>Error loading the question.</MessageBar>
            );
        </Container>
    );
};
