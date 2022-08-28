export type ApiResponse<Type> = {
    body: Query<Type>;
    has_error: boolean;
    error_message?: string;
};

type Query<Type> = {
    items?: Type;
    error_id?: number;
    error_message?: string;
    error_name?: string;
};
