export interface LoginResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export interface FormState {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface FormStateRegister {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id?: string;
    role?: null;
    name: string;
    email: string;
    updated_at?: string;
    created_at?: string;
}
