import React from 'react';
import SidebarHeader from './SidebarHeader';
import SearchBar from './SearchBar';
import ChatList from './ChatList';

const Sidebar = ({ user, chats, activeChatId, onChatSelect, onCreateChat }) => {
    return (
        <div className="sidebar" style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
            height: '100%',
            borderRight: '1px solid var(--glass-border)'
        }}>
            <SidebarHeader user={user} onCreateChat={onCreateChat} />
            <SearchBar />
            <ChatList chats={chats} activeChatId={activeChatId} onChatSelect={onChatSelect} />
        </div>
    );
};

export default Sidebar;
