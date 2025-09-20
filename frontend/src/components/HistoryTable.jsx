
import { useState } from 'react';
import axios from 'axios';

const styles = {
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '12px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f7fafc' },
    td: { padding: '12px', borderBottom: '1px solid #e2e8f0' },
    button: { padding: '6px 12px', backgroundColor: 'transparent', color: '#2c7a7b', border: '1px solid #2c7a7b', borderRadius: '4px', cursor: 'pointer' },
};

const HistoryTable = ({ history, apiUrl, onViewDetails }) => {
  const [isLoadingDetails, setIsLoadingDetails] = useState(null);
  
  // Create an authenticated API instance
  const api = axios.create({ baseURL: apiUrl });
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  const handleDetailsClick = async (resumeId) => {
    setIsLoadingDetails(resumeId);
    try {
      const response = await api.get(`/resumes/${resumeId}`);
      onViewDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      alert("Failed to fetch details.");
    } finally {
      setIsLoadingDetails(null);
    }
  };
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>File Name</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Uploaded At</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.file_name}</td>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.email}</td>
              <td style={styles.td}>{new Date(item.uploaded_at).toLocaleString()}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => handleDetailsClick(item.id)}
                  disabled={isLoadingDetails === item.id}
                >
                  {isLoadingDetails === item.id ? 'Loading...' : 'Details'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryTable;