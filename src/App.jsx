import { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/Chat/ChatWindow';
import Login from './components/Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, query, where, serverTimestamp } from 'firebase/firestore';

function App() {
  const [user, loading] = useAuthState(auth);
  const [activeChatId, setActiveChatId] = useState(null);

  // Fetch chats where the current user is a participant
  const [chatsSnapshot] = useCollection(
    user ? query(collection(db, 'chats'), where('users', 'array-contains', user.email)) : null
  );

  const chats = (user && chatsSnapshot?.docs.map(doc => {
    const data = doc.data();
    const otherEmail = data.users.find(u => u !== user.email);
    // Use saved name if available, otherwise fall back to email
    const storedName = data.userNames ? data.userNames[otherEmail] : null;

    return {
      id: doc.id,
      ...data,
      name: storedName || otherEmail,
      avatar: `https://ui-avatars.com/api/?name=${storedName || otherEmail}&background=random`,
      lastMessage: data.lastMessage?.text || "No messages",
      time: data.lastMessage?.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ""
    };
  })) || [];

  const createChat = () => {
    const email = prompt('Enter email to chat with:');
    if (!email || !user) return;

    // Check if chat already exists
    if (email === user.email || chats.find(c => c.users.includes(email))) {
      alert("Chat already exists or invalid!");
      return;
    }

    const name = prompt('Enter a name for this contact (optional):');

    addDoc(collection(db, 'chats'), {
      users: [user.email, email],
      userNames: {
        [email]: name || email, // Store name for the contact
        [user.email]: user.displayName || user.email // Store own name
      },
      lastMessage: null,
      createdAt: serverTimestamp()
    });
  };

  const activeChat = chats.find(c => c.id === activeChatId);
  // We need to fetch messages for active chat

  const handleChatSelect = (id) => {
    setActiveChatId(id);
  };


  // Simple mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', backgroundColor: '#d1d7db' }}>
        <div className="loader" style={{ width: 50, height: 50, border: '5px solid #00a884', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container" style={{ display: 'flex', width: '100%', height: '100%', maxWidth: '1600px', margin: '0 auto', backgroundColor: 'rgba(30,30,30,0.6)', backdropFilter: 'blur(20px)', boxShadow: '0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24)' }}>
      <div style={{ display: isMobile && activeChatId ? 'none' : 'flex', width: isMobile ? '100%' : '30%', minWidth: isMobile ? '100%' : '350px', maxWidth: isMobile ? '100%' : '450px', flexDirection: 'column', borderRight: '1px solid var(--border-color)' }}>
        <Sidebar
          user={user}
          chats={chats}
          activeChatId={activeChatId}
          onChatSelect={handleChatSelect}
          onCreateChat={createChat}
        />
      </div>
      <div style={{ display: isMobile && !activeChatId ? 'none' : 'flex', flex: 1, height: '100%' }}>
        <ChatWindow activeChat={activeChat} onBack={() => setActiveChatId(null)} isMobile={isMobile} />
      </div>
    </div>
  );
}

export default App;
