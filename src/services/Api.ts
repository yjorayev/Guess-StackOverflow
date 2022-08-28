import { Answer, ApiResponse, Question } from '../models';

export class Api {
    private static apiUrl = 'https://api.stackexchange.com/2.3';

    static async getQuestions(): Promise<ApiResponse<Question[]>> {
        const url = new URL('/questions', this.apiUrl);
        url.searchParams.append('site', 'stackoverflow');
        url.searchParams.append('filter', 'withbody');
        url.searchParams.append('page', '1');
        url.searchParams.append('pagesize', '100');
        url.searchParams.append('sort', 'votes');
        url.searchParams.append('min', '100');

        const response = await Api.get<Question[]>(url);
        if (!response.has_error) {
            response.body.items = response.body.items!.filter(
                (question) => question.answer_count > 1 && question.accepted_answer_id
            );
        }
        return response;
    }

    static async getAnswers(questionId: number): Promise<ApiResponse<Answer[]>> {
        const url = new URL(`/questions/${questionId}/answers`, this.apiUrl);
        url.searchParams.append('site', 'stackoverflow');
        url.searchParams.append('filter', 'withbody');

        const response = await Api.get<Answer[]>(url);
        return response;
    }

    static async get<Type>(url: URL): Promise<ApiResponse<Type>> {
        const response = await fetch(url);
        const body = await response.json();
        let error_message;
        if (response.status >= 500) {
            error_message = `Internal server error. ${body.error_name}: ${body.error_message}`;
        } else if (response.status >= 400) {
            error_message = `Invalid request. ${body.error_name}: ${body.error_message}`;
        } else if (!response.ok) {
            error_message = 'Unexpected error occured.';
        }

        return {
            body,
            has_error: !response.ok,
            error_message,
        };
    }
}
