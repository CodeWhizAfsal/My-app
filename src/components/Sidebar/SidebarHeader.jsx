import React, { useState } from 'react';
import { auth } from '../../firebase';
import ProfileModal from '../ProfileModal';

const SidebarHeader = ({ user, onCreateChat }) => {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div style={{
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div
                onClick={() => setShowProfile(true)}
                style={{ width: 40, height: 40, borderRadius: '50%', background: '#dfe3e5', overflow: 'hidden', cursor: 'pointer' }}
            >
                <img src={user?.photoURL} alt={user?.displayName} style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{ display: 'flex', gap: '20px', color: '#54656f' }}>
                <span className="pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 .244 1.091l1.716 1.716a.975.975 0 0 0 1.092.244 10.05 10.05 0 0 0 5.65-9.303.977.977 0 0 0-1.091-.244l-1.716 1.716a.975.975 0 0 0-.244 1.092 10.05 10.05 0 0 0 9.303-5.65.977.977 0 0 0-.244-1.091l-1.716-1.716a.975.975 0 0 0-1.092-.244 10.05 10.05 0 0 0-5.65 9.303.977.977 0 0 0 1.091.244l1.716-1.716a.975.975 0 0 0 .244-1.092Z"></path><path fill="currentColor" d="M12 20.664a8.664 8.664 0 1 1 0-17.328 8.664 8.664 0 0 1 0 17.328ZM12 4.336a7.664 7.664 0 1 0 0 15.328 7.664 7.664 0 0 0 0-15.328Z"></path></svg>
                </span>
                <span className="pointer" title="New Chat" onClick={onCreateChat}>
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646Zm-4.989 9.869H6.666a.6.6 0 0 1 0-1.2h7.35a.6.6 0 0 1 0 1.2Zm3-3H6.666a.6.6 0 0 1 0-1.2h10.35a.6.6 0 0 1 0 1.2Zm0-3H6.666a.6.6 0 0 1 0-1.2h10.35a.6.6 0 0 1 0 1.2Z"></path></svg>
                </span>
                <span className="pointer" title="Logout" onClick={() => auth.signOut()}>
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7Zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9Zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15Z"></path></svg>
                </span>
            </div>

            {showProfile && (
                <ProfileModal
                    user={{ ...user, name: user.displayName, avatar: user.photoURL }}
                    onClose={() => setShowProfile(false)}
                />
            )}
        </div>
    );
};

export default SidebarHeader;
