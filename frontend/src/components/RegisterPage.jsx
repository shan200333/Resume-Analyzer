
import { useState } from 'react';

const styles = {
    container: { maxWidth: '400px', margin: '50px auto', padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' },
    input: { width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #cbd5e0', borderRadius: '4px' },
    button: { width: '100%', padding: '10px', backgroundColor: '#2c7a7b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    heading: { fontSize: '1.5rem', textAlign: 'center', marginBottom: '24px' },
    text: { textAlign: 'center', marginTop: '16px' },
    link: { color: '#2c7a7b', cursor: 'pointer' },
};

const RegisterPage = ({ onRegister, onShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={styles.input} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={styles.input} 
                    required 
                />
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <p style={styles.text}>
                Already have an account? <a onClick={onShowLogin} style={styles.link}>Login here</a>
            </p>
        </div>
    );
};

export default RegisterPage;