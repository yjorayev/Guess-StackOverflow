import { Question } from '../models';
import questions from './sampleQuestions.json';

export class Api {
    private static apiUrl = 'https://api.stackexchange.com/2.3';

    static get(): Question[] {
        return questions.items as Question[];
    }

    static async getQuestions(): Promise<Question[]> {
        const url = new URL('/questions', this.apiUrl);
        url.searchParams.append('site', 'stackoverflow');
        url.searchParams.append('filter', 'withbody');

        const response = await fetch(url);
        const responseBody: Query<Question[]> = await response.json();
        return responseBody.items;
    }
}

type Query<Type> = {
    items: Type;
};
