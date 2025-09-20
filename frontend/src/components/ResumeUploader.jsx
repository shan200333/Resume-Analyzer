
import { useState } from 'react';

const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px', border: '2px dashed #cbd5e0', borderRadius: '8px' },
    text: { fontSize: '1.125rem', textAlign: 'center' },
    button: { padding: '8px 16px', backgroundColor: '#2c7a7b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonDisabled: { backgroundColor: '#a0aec0', cursor: 'not-allowed' },
    fileName: { fontSize: '0.875rem', color: '#718096' },
};

const ResumeUploader = ({ onUpload, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  const handleUploadClick = () => { if (selectedFile) onUpload(selectedFile); };
  return (
    <div style={styles.container}>
      <p style={styles.text}>Upload your resume to get an instant analysis!</p>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button
        onClick={handleUploadClick}
        style={!selectedFile || isLoading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
      </button>
      {selectedFile && <p style={styles.fileName}>Selected file: {selectedFile.name}</p>}
    </div>
  );
};
export default ResumeUploader;