import React from 'react';

const ChatListItem = ({ chat, active, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`chat-item ${active ? 'active' : ''}`}
            style={{
                display: 'flex',
                padding: '0 15px',
                height: '80px', // Taller
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                borderBottom: '1px solid var(--glass-border)',
                transition: 'background 0.2s',
                margin: '5px 10px',
                borderRadius: '12px'
            }}
            onMouseOver={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)' }}
            onMouseOut={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
        >
            <div style={{ width: 49, height: 49, borderRadius: '50%', background: '#dfe3e5', overflow: 'hidden', flexShrink: 0 }}>
                <img src={chat.avatar} alt="Profile" style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{ marginLeft: 15, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '17px', color: 'var(--text-primary)' }}>{chat.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{chat.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px'
                    }}>
                        {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                        <span style={{
                            backgroundColor: 'var(--primary-green)',
                            color: '#fff',
                            borderRadius: '50%',
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '500'
                        }}>
                            {chat.unread}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatListItem;
