export interface AuthState {
    user: any | null;
    loading: boolean;
    initialized: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    loading: true,
    initialized: false,
    error: null
};