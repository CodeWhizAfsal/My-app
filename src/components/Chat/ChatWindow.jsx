import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { db, auth } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, query, orderBy, serverTimestamp, setDoc, doc } from 'firebase/firestore';

const ChatWindow = ({ activeChat, onBack, isMobile }) => {
    // Listen to messages subcollection of the active chat
    const [messagesSnapshot] = useCollection(
        activeChat ? query(collection(db, 'chats', activeChat.id, 'messages'), orderBy('timestamp', 'asc')) : null
    );

    const messages = messagesSnapshot?.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format timestamp safely
        time: doc.data().timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "..."
    })) || [];

    const handleSendMessage = async (text, attachment = null) => {
        if (!activeChat || !auth.currentUser) return;

        const messageData = {
            text: text || '',
            sender: auth.currentUser.email,
            timestamp: serverTimestamp(),
            status: 'sent',
            ...(attachment && { attachment }) // Add attachment if exists
        };

        // Add message to subcollection
        await addDoc(collection(db, 'chats', activeChat.id, 'messages'), messageData);

        const lastMessageText = attachment
            ? (attachment.type === 'image' ? '📷 Photo' : '📄 File')
            : text;

        // Update last message in chat document
        await setDoc(doc(db, 'chats', activeChat.id), {
            lastMessage: {
                text: lastMessageText,
                timestamp: serverTimestamp()
            }
        }, { merge: true });
    };

    if (!activeChat) {
        // ... existing welcome screen code ...
        return (
            <div className="chat-area" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--panel-header-bg)',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '6px solid #43c960'
            }}>
                <div style={{ textAlign: 'center', color: '#41525d' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '300', marginBottom: '10px' }}>WhatsApp Web</h1>
                    <p style={{ fontSize: '14px', lineHeight: '20px' }}>Send and receive messages without keeping your phone online.<br />Use WhatsApp on up to 4 linked devices and 1 phone.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-area" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <ChatHeader activeChat={activeChat} onBack={onBack} isMobile={isMobile} />

            {/* Background Pattern Overlay with Blend Mode */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                pointerEvents: 'none',
                filter: 'invert(1)' // Invert pattern for dark mode
            }}></div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1, overflow: 'hidden' }}>
                <MessageList messages={messages} />
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatWindow;
