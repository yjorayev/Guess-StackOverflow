import { DetailsList, DetailsListLayoutMode, IColumn, Link, SelectionMode, Stack, Text } from '@fluentui/react';
import { Question } from '../models';
import { Api } from '../services/Api';

export const QuestionsList = () => {
    const response = Api.get<Question[]>();
    const columns: IColumn[] = [
        {
            key: 'title',
            name: 'Title',
            fieldName: 'title',
            minWidth: 500,
            flexGrow: 1,
            isResizable: true,
            onRender: (item: Question) => <Link>{item.title}</Link>,
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
            flexGrow: 2,
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
                items={response}
                columns={columns}
                compact={true}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                styles={{ root: { padding: 0 } }}
            />
        </>
    );
};
