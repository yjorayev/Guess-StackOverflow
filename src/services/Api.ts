import { Answer, Question } from '../models';

export class Api {
    private static apiUrl = 'https://api.stackexchange.com/2.3';

    static async getQuestions(): Promise<Question[]> {
        const url = new URL('/questions', this.apiUrl);
        url.searchParams.append('site', 'stackoverflow');
        url.searchParams.append('filter', 'withbody');
        url.searchParams.append('page', '1');
        url.searchParams.append('pagesize', '100');
        url.searchParams.append('sort', 'votes');
        url.searchParams.append('min', '100');

        const response = await fetch(url);
        const responseBody: Query<Question[]> = await response.json();
        return responseBody.items.filter((question) => question.answer_count > 1 && question.accepted_answer_id);
    }

    static async getAnswers(questionId: number): Promise<Answer[]> {
        const url = new URL(`/questions/${questionId}/answers`, this.apiUrl);
        url.searchParams.append('site', 'stackoverflow');
        url.searchParams.append('filter', 'withbody');

        const response = await fetch(url);
        const responseBody: Query<Answer[]> = await response.json();

        return responseBody.items;
    }
}

type Query<Type> = {
    items: Type;
};
