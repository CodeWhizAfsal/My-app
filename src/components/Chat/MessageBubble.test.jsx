import { render, screen } from '@testing-library/react';
import MessageBubble from './MessageBubble';
import { expect, test, vi } from 'vitest';

// Mock firebase auth
vi.mock('../../firebase', () => ({
    auth: {
        currentUser: {
            email: 'test@example.com'
        }
    }
}));

test('renders incoming message correctly', () => {
    const message = {
        text: 'Hello World',
        time: '12:00 PM',
        sender: 'other@example.com',
        status: 'sent'
    };

    render(<MessageBubble message={message} />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
});

test('renders outgoing message correctly', () => {
    const message = {
        text: 'My Message',
        time: '12:01 PM',
        sender: 'test@example.com',
        status: 'read'
    };

    render(<MessageBubble message={message} />);

    expect(screen.getByText('My Message')).toBeInTheDocument();
    // Check if read receipt icon is present (by checking for svg or class)
    // Detailed implementation depends on DOM structure, for now just content check
});
