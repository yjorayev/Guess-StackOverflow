export type Answer = {
    answer_id: number;
    creation_date: number;
    is_accepted: boolean;
    last_activity_date: number;
    question_id: number;
    score: number;
    body: string;
    owner: {
        display_name: string;
    };
};
