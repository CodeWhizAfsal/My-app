import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).catch((err) => setError(err.message));
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name) {
                    await updateProfile(userCredential.user, { displayName: name });
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Left Panel - Blue Design */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                overflow: 'hidden',
                padding: '40px'
            }}>
                {/* Decorative Background Circles */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

                {/* Decorative Wave/Lines (CSS approximation) */}
                <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', opacity: 0.3 }} viewBox="0 0 1440 320">
                    <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                <div style={{ zIndex: 1, textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>AM Chat App</div>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>WELCOME BACK</h1>
                    <div style={{ width: '50px', height: '4px', background: 'white', margin: '0 auto 20px auto', borderRadius: '2px' }}></div>
                    <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
                        Connect instantly with your friends and family. Experience the future of messaging with our premium glassmorphic interface.
                    </p>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div style={{
                flex: 1,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ color: '#2c3e50', fontSize: '28px', marginBottom: '40px', textAlign: 'center' }}>
                        {isSignUp ? 'Create Account' : 'Login Account'}
                    </h2>

                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {isSignUp && (
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '15px 20px',
                                        background: '#f5f7fa',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        color: '#333'
                                    }}
                                    required
                                />
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px 20px',
                                    background: '#f5f7fa',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: '#333'
                                }}
                                required
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px 20px',
                                    background: '#f5f7fa',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: '#333'
                                }}
                                required
                            />
                        </div>

                        {error && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{error}</p>}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#7f8c8d' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ marginRight: '8px' }} />
                                Keep me signed in
                            </label>

                            <span
                                onClick={() => setIsSignUp(!isSignUp)}
                                style={{ color: '#3498db', cursor: 'pointer', fontWeight: '500' }}
                            >
                                {isSignUp ? 'Already a member?' : 'Create account?'}
                            </span>
                        </div>

                        <button
                            type="submit"
                            style={{
                                background: '#0984e3',
                                color: 'white',
                                padding: '15px',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(9, 132, 227, 0.4)',
                                marginTop: '10px'
                            }}
                        >
                            {isSignUp ? 'SIGN UP' : 'SUBSCRIBE'}
                        </button>
                    </form>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <p style={{ color: '#bdc3c7', fontSize: '12px', marginBottom: '15px' }}>- OR -</p>
                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            style={{
                                background: 'white',
                                color: '#333',
                                border: '1px solid #dfe6e9',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#DB4437" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
