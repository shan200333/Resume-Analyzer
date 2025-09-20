// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeUploader from './components/ResumeUploader';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryTable from './components/HistoryTable';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const styles = {
  container: { fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '32px' },
  heading: { fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px', color: '#1a202c' },
  tabsContainer: { border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#ffffff', overflow: 'hidden' },
  tabList: { display: 'flex', borderBottom: '1px solid #e2e8f0' },
  tab: { padding: '16px', cursor: 'pointer', flexGrow: 1, textAlign: 'center', backgroundColor: '#f7fafc', color: '#4a5568', fontWeight: '500' },
  activeTab: { backgroundColor: '#2c7a7b', color: 'white' },
  tabPanel: { padding: '24px' },
  logoutButton: { position: 'absolute', top: '20px', right: '20px', padding: '8px 16px', backgroundColor: '#c53030', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

const API_URL = "http://127.0.0.1:8000";

// Create an API instance that will automatically include the token in every request
const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('analyzer');

  const setAuthToken = (newToken) => {
    if (newToken) {
        localStorage.setItem('token', newToken);
    } else {
        localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get('/resumes'); // Use the 'api' instance
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      alert("Failed to fetch history.");
    }
  };

  // Fetch history only when the user is logged in (token changes)
  useEffect(() => {
    if (token) {
        fetchHistory();
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const response = await axios.post(`${API_URL}/token`, formData);
        setAuthToken(response.data.access_token);
    } catch (error) {
        alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (email, password) => {
    try {
        await axios.post(`${API_URL}/users/register`, { email, password });
        alert('Registration successful! Please log in.');
        setShowRegister(false);
    } catch (error) {
        alert(error.response?.data?.detail || 'Registration failed.');
    }
  };

  const handleLogout = () => setAuthToken(null);
  
  const handleUpload = async (file) => {
    if (!file) return;
    setIsLoading(true);
    setAnalysisResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post('/resumes', formData); // Use the 'api' instance
      console.log("Data from backend:", response.data);
      setAnalysisResult(response.data);
      alert("Analysis Complete!");
      fetchHistory(); // Refresh history
    } catch (error) {
      alert(error.response?.data?.detail || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (resumeData) => {
    setAnalysisResult(resumeData);
    setActiveTab('analyzer');
  };

  // If there is no token, show the login/register page
  if (!token) {
    return showRegister
        ? <RegisterPage onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
        : <LoginPage onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />;
  }

  // If there IS a token, show the main application
  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <h1 style={styles.heading}>📄 AI Resume Analyzer</h1>
        <div style={styles.tabsContainer}>
          <div style={styles.tabList}>
            <div
              style={{ ...styles.tab, ...(activeTab === 'analyzer' && styles.activeTab) }}
              onClick={() => setActiveTab('analyzer')}
            >Analyze Resume</div>
            <div
              style={{ ...styles.tab, ...(activeTab === 'history' && styles.activeTab) }}
              onClick={() => { setActiveTab('history'); setAnalysisResult(null); }}
            >History</div>
          </div>
          {activeTab === 'analyzer' && (
            <div style={styles.tabPanel}>
              <ResumeUploader onUpload={handleUpload} isLoading={isLoading} />
              {analysisResult && <ResultsDisplay data={analysisResult} />}
            </div>
          )}
          {activeTab === 'history' && (
            <div style={styles.tabPanel}>
              <HistoryTable history={history} apiUrl={API_URL} onViewDetails={handleViewDetails} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;