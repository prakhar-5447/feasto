import type {
    LoginRequest,
    LoginResponse,
} from './auth.types';

class AuthService {
    async login(
        credentials: LoginRequest,
    ): Promise<LoginResponse> {
        const response = await fetch(
            '/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            },
        );

        const data =
            (await response.json()) as LoginResponse;

        if (!response.ok) {
            throw new Error(
                data.message ||
                'Unable to sign in.',
            );
        }

        return data;
    }
}

export const authService = new AuthService();