import React from 'react';

const SearchBar = () => {
    return (
        <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid var(--glass-border)',
            backgroundColor: 'transparent'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '0 15px',
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                border: '1px solid var(--glass-border)'
            }}>
                <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.205 5.205 0 1 0-5.205 5.205 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.999-4.004Zm-4.715 0a3.81 3.81 0 1 1 3.81-3.81 3.816 3.816 0 0 1-3.81 3.81Z"></path></svg>
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        marginLeft: '10px',
                        width: '100%',
                        fontSize: '14px',
                        color: 'var(--text-primary)'
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
