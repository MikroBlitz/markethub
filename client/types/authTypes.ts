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