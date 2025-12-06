import React from 'react';
import ChatListItem from './ChatListItem';

const ChatList = ({ chats, activeChatId, onChatSelect }) => {
    return (
        <div style={{ flex: 1, overflowY: 'auto' }}>
            {chats.map((chat) => (
                <ChatListItem
                    key={chat.id}
                    chat={chat}
                    active={activeChatId === chat.id}
                    onClick={() => onChatSelect(chat.id)}
                />
            ))}
        </div>
    );
};

export default ChatList;
