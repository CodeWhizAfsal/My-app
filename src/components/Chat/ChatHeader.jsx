import React, { useState } from 'react';
import ProfileModal from '../ProfileModal';

const ChatHeader = ({ activeChat, onBack, isMobile }) => {
    const [showProfile, setShowProfile] = useState(false);

    if (!activeChat) return null;

    return (
        <div style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--glass-border)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowProfile(true)}>
                {isMobile && (
                    <div onClick={(e) => { e.stopPropagation(); onBack(); }} style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(180 12 12)"></path></svg>
                    </div>
                )}
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dfe3e5', overflow: 'hidden', marginRight: 15 }}>
                    <img src={activeChat.avatar} alt="Profile" style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{activeChat.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>online today at 12:30 PM</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', color: '#54656f' }}>
                <span className="pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.205 5.205 0 1 0-5.205 5.205 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.999-4.004Zm-4.715 0a3.81 3.81 0 1 1 3.81-3.81 3.816 3.816 0 0 1-3.81 3.81Z"></path></svg>
                </span>
                <span className="pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7Zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9Zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15Z"></path></svg>
                </span>
            </div>

            {showProfile && (
                <ProfileModal
                    user={activeChat}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </div>
    );
};

export default ChatHeader;
