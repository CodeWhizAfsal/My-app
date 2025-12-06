import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileModal from './ProfileModal';
import { signOut } from 'firebase/auth';

// Mock Firebase
vi.mock('../firebase', () => ({
    auth: {
        currentUser: { email: 'current@example.com' }
    }
}));

vi.mock('firebase/auth', () => ({
    signOut: vi.fn(),
    getAuth: vi.fn()
}));

// Mock react-dom createPortal to render in-place for testing
vi.mock('react-dom', () => ({
    createPortal: (node) => node
}));

describe('ProfileModal Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders nothing if no user is provided', () => {
        const { container } = render(<ProfileModal user={null} onClose={() => { }} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders user details correctly', async () => {
        const user = {
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://example.com/avatar.jpg'
        };

        render(<ProfileModal user={user} onClose={() => { }} />);

        // Since it uses requestAnimationFrame, we might need to wait for visibility
        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument();
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
            expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
        });
    });

    it('handles missing avatar/name (Fallback Logic)', async () => {
        const user = {
            email: 'fallback@example.com',
            // No name, no avatar
        };

        render(<ProfileModal user={user} onClose={() => { }} />);

        await waitFor(() => {
            // Should fallback to 'User'
            expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('User');
            // Image source should contain ui-avatars
            const img = screen.getByRole('img');
            expect(img.src).toContain('ui-avatars.com');
        });
    });

    it('shows Logout button for current user', async () => {
        const user = {
            email: 'current@example.com', // Matches mock current user
            name: 'Me'
        };

        render(<ProfileModal user={user} onClose={() => { }} />);

        await waitFor(() => {
            expect(screen.getByText(/Logout/i)).toBeInTheDocument();
        });
    });

    it('shows Send Email option for other users', async () => {
        const user = {
            email: 'other@example.com',
            name: 'Other'
        };

        render(<ProfileModal user={user} onClose={() => { }} />);

        await waitFor(() => {
            expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
            expect(screen.getByText(/Send Email/i)).toBeInTheDocument();
        });
    });

    it('calls signOut when logout is clicked', async () => {
        const user = {
            email: 'current@example.com',
            name: 'Me'
        };

        render(<ProfileModal user={user} onClose={() => { }} />);

        await waitFor(() => {
            const logoutBtn = screen.getByText(/Logout/i);
            fireEvent.click(logoutBtn);
        });

        expect(signOut).toHaveBeenCalled();
    });
});
