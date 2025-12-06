import React, { useState, useRef } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);

            // Create a upload promise
            const uploadPromise = uploadBytes(storageRef, file);

            // Create a timeout promise (e.g., 20 seconds)
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Upload timed out. Check your internet or Firebase Storage rules.")), 20000)
            );

            // Race them
            const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
            const downloadURL = await getDownloadURL(snapshot.ref);

            onSendMessage('', {
                type: file.type.startsWith('image/') ? 'image' : 'file',
                url: downloadURL,
                name: file.name
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            // Show specific error to user
            let errorMessage = "Failed to upload file.";
            if (error.code === 'storage/unauthorized') {
                errorMessage = "Permission denied. Check Firebase Storage Rules.";
            } else if (error.code === 'storage/canceled') {
                errorMessage = "Upload canceled.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(`Error: ${errorMessage}`);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div style={{
            padding: '15px 20px',
            background: 'transparent',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />

            <div className="pointer" style={{ color: 'var(--text-secondary)' }} onClick={() => fileInputRef.current?.click()}>
                {uploading ? (
                    <div style={{ width: 24, height: 24, border: '2px solid var(--accent-color)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.646 3.972 1.646c1.5 0 2.91-.584 3.972-1.646l9.41-9.41c2.19-2.19 2.19-5.747 0-7.939-2.189-2.189-5.747-2.189-7.939 0l-8.48 8.48c-1.312 1.312-1.312 3.441 0 4.755 1.312 1.313 3.442 1.312 4.755 0l7.55-7.55a.754.754 0 0 0-1.066-1.066l-7.55 7.55a2.062 2.062 0 0 0 0 2.915 2.067 2.067 0 0 0 2.915 0l8.48-8.48c1.583-1.583 1.583-4.156 0-5.739-1.582-1.581-4.156-1.582-5.739 0l-9.41 9.409c-.752.753-1.167 1.753-1.167 2.817 0 1.064.415 2.064 1.167 2.817a3.984 3.984 0 0 0 2.817 1.167 3.985 3.985 0 0 0 2.817-1.167l8.188-8.192a.75.75 0 0 0-1.061-1.06l-8.188 8.192a2.472 2.472 0 0 1-1.756.727 2.476 2.476 0 0 1-1.756-.727z"></path></svg>
                )}
            </div>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Type a message..."
                style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: '25px',
                    border: '1px solid var(--glass-border)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px',
                    backdropFilter: 'blur(5px)'
                }}
            />

            {text.trim() ? (
                <div className="pointer" style={{
                    color: '#000',
                    background: 'var(--accent-gradient)',
                    padding: '10px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(0,255,200,0.3)'
                }} onClick={() => { onSendMessage(text); setText('') }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                </div>
            ) : (
                <div className="pointer" style={{ color: 'var(--text-secondary)' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm4.338-9.116c-.722-1.353-2.121-2.193-3.666-2.193s-2.943.84-3.666 2.194l.87.492c.504-.943 1.5-1.529 2.617-1.529s2.113.586 2.617 1.529l.87-.492a4.34 4.34 0 0 1-.642.999l.808.811a5.618 5.618 0 0 0-.251-1.811h.043z"></path></svg>
                </div>
            )}
        </div>
    );
};

export default MessageInput;
