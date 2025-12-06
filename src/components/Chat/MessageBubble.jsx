import React from 'react';
import { auth } from '../../firebase';

const MessageBubble = ({ message }) => {
    const isOutgoing = message.sender === auth.currentUser?.email;

    return (
        <div className="message-bubble-enter" style={{
            display: 'flex',
            justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
        }}>
            <div style={{
                maxWidth: '65%',
                background: isOutgoing ? 'var(--outgoing-message)' : 'var(--glass-bg)',
                backdropFilter: isOutgoing ? 'none' : 'blur(10px)',
                color: '#fff',
                padding: '8px 12px 10px 12px',
                borderRadius: '18px',
                borderTopRightRadius: isOutgoing ? '4px' : '18px',
                borderTopLeftRadius: isOutgoing ? '18px' : '4px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {message.attachment ? (
                    message.attachment.type === 'image' ? (
                        <div style={{ marginBottom: '5px' }}>
                            <img
                                src={message.attachment.url}
                                alt="Attachment"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '8px',
                                    display: 'block'
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(0,0,0,0.1)',
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '5px'
                        }}>
                            <span style={{ fontSize: '24px' }}>📄</span>
                            <a
                                href={message.attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    wordBreak: 'break-all'
                                }}
                            >
                                {message.attachment.name || 'Document'}
                            </a>
                        </div>
                    )
                ) : null}

                {message.text && (
                    <span style={{ fontSize: '14.2px', lineHeight: '19px' }}>
                        {message.text}
                    </span>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '-4px',
                    marginLeft: '20px'
                }}>
                    <span style={{ fontSize: '11px', color: 'rgba(17, 27, 33, 0.5)', marginRight: '3px' }}>
                        {message.time}
                    </span>
                    {isOutgoing && (
                        <span className={message.status === 'read' ? 'read-receipt' : ''} style={{ color: message.status === 'read' ? '#53bdeb' : 'rgba(17, 27, 33, 0.5)' }}>
                            <svg viewBox="0 0 16 11" width="16" height="11" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M12.157 1.258l-6.708 6.671-3.235-3.28-1.558 1.547 4.793 4.827 8.274-8.219-1.566-1.546z"></path></svg>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
