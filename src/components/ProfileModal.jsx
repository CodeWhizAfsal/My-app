import { createPortal } from 'react-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';

const ProfileModal = ({ user, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const isCurrentUser = auth.currentUser?.email === user?.email;

    useEffect(() => {
        // Trigger animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            handleClose();
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Error signing out. Check console.");
        }
    };

    if (!user) return null;

    // Helper to get safe name
    const displayName = user.name || user.displayName || 'User';

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999, // High z-index to ensure visibility
            pointerEvents: 'auto' // Ensure clicks are captured
        }}>
            {/* Backdrop */}
            <div
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    cursor: 'pointer'
                }}
            />

            {/* Modal Content */}
            <div className="glass-panel" style={{
                width: '350px',
                padding: '40px 30px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                zIndex: 100000,
                pointerEvents: 'auto'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                </button>

                <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    border: '3px solid var(--accent-color)',
                    boxShadow: '0 0 20px rgba(0, 255, 200, 0.2)',
                    background: '#2a2a2a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={user.avatar || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&color=fff`}
                        alt={displayName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&color=fff`;
                        }}
                    />
                </div>

                <h2 className="text-gradient" style={{ fontSize: '24px', marginBottom: '5px' }}>
                    {displayName}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '14px' }}>
                    {user.email}
                </p>

                {isCurrentUser ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255, 59, 48, 0.15)',
                            color: '#ff3b30',
                            border: '1px solid rgba(255, 59, 48, 0.3)',
                            padding: '12px 0',
                            width: '100%',
                            borderRadius: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255, 59, 48, 0.25)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255, 59, 48, 0.15)'}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
                        Logout
                    </button>
                ) : (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '12px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: 'var(--text-primary)'
                        }}>
                            <span>📧</span>
                            <span style={{ fontSize: '14px' }}>Send Email</span>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default ProfileModal;
