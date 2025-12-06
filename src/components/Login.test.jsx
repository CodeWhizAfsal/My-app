import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Mock Firebase Auth
vi.mock('../firebase', () => ({
    auth: {},
    provider: {}
}));

vi.mock('firebase/auth', () => ({
    signInWithPopup: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    updateProfile: vi.fn(),
    getAuth: vi.fn(),
    GoogleAuthProvider: vi.fn()
}));

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders default login view correctly', () => {
        render(<Login />);
        expect(screen.getByText(/WELCOME BACK/i)).toBeInTheDocument();
        expect(screen.getByText(/Login Account/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email ID/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/SUBSCRIBE/i)).toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/Full Name/i)).not.toBeInTheDocument();
    });

    it('toggles to Sign Up view', () => {
        render(<Login />);
        const toggleLink = screen.getByText(/Create account\?/i);
        fireEvent.click(toggleLink);

        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
        expect(screen.getByText(/SIGN UP/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Already a member\?/i)).toBeInTheDocument();
    });

    it('calls signInWithEmailAndPassword on Login submit', async () => {
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Email ID/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

        // Return a resolved promise to prevent warnings
        signInWithEmailAndPassword.mockResolvedValueOnce({});

        fireEvent.click(screen.getByText(/SUBSCRIBE/i));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
        });
    });

    it('calls createUserWithEmailAndPassword on Sign Up submit', async () => {
        render(<Login />);
        fireEvent.click(screen.getByText(/Create account\?/i));

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Email ID/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'newpass123' } });

        const mockUser = { user: { uid: '123' } };
        createUserWithEmailAndPassword.mockResolvedValueOnce(mockUser);
        updateProfile.mockResolvedValueOnce({});

        fireEvent.click(screen.getByText(/SIGN UP/i));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'new@example.com', 'newpass123');
            expect(updateProfile).toHaveBeenCalledWith(mockUser.user, { displayName: 'John Doe' });
        });
    });

    it('calls signInWithPopup for Google Login', async () => {
        render(<Login />);
        const googleBtn = screen.getByRole('button', { name: /Continue with Google/i }); // Using role query is better for buttons with icons/text

        // Alternatively, if role query is tricky due to content:
        // const googleBtn = screen.getByText(/Continue with Google/i);

        fireEvent.click(googleBtn);
        expect(signInWithPopup).toHaveBeenCalled();
    });
});
