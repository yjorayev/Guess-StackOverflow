import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode, Stack, Text } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../models';
import { Api } from '../services/Api';
import { decodeHtml } from '../services/Helpers';

export const QuestionsList = () => {
    const [questions, setQuestions] = React.useState<Question[]>([]);

    React.useEffect(() => {
        const getQuestions = async () => {
            const response = await Api.getQuestions();

            setQuestions(response);
        };

        getQuestions();
    }, []);

    const columns: IColumn[] = [
        {
            key: 'title',
            name: 'Title',
            fieldName: 'title',
            minWidth: 500,
            flexGrow: 1,
            calculatedWidth: 0,
            isResizable: true,
            onRender: (item: Question) => (
                <Link key={item.question_id} to={`/question/${item.question_id}`} state={{ question: item }}>
                    {decodeHtml(item.title)}
                </Link>
            ),
        },
        {
            key: 'creation_date',
            name: 'Craetion Date',
            fieldName: 'creation_date',
            minWidth: 300,
            onRender: (item: Question) => <span>{new Date(item.creation_date).toUTCString()}</span>,
            isResizable: true,
        },
        {
            key: 'answer_count',
            name: 'Answer Count',
            fieldName: 'answer_count',
            minWidth: 100,
            flexGrow: 1,
            calculatedWidth: 0,
            isResizable: true,
        },
    ];

    return (
        <>
            <Stack horizontalAlign="center">
                <Text variant="xLargePlus">Pick a question</Text>
            </Stack>

            <DetailsList
                key="questionsList"
                items={questions}
                columns={columns}
                compact={true}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
            />
        </>
    );
};
