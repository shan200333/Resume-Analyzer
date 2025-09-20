// frontend/src/components/ResultsDisplay.jsx
const styles = {
    section: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', width: '100%', backgroundColor: '#ffffff' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' },
    badge: { display: 'inline-block', padding: '4px 8px', borderRadius: '12px', fontSize: '0.875rem', color: 'white' },
};

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>{title}</h2>
    <div>{children}</div>
  </div>
);
const ResultsDisplay = ({ data }) => {
  if (!data) return null;
  const links = data.links || [];
  const technicalSkills = data.skills?.technical || [];
  const softSkills = data.skills?.soft || [];
  const tools = data.skills?.tools || [];
  const improvementAreas = data.improvement_areas || [];
  const upskillSuggestions = data.upskill_suggestions || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{data.name || 'N/A'}</h2>
        <p style={{ color: '#4a5568' }}>{data.email || 'N/A'} | {data.phone || 'N/A'}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
          {links.map(link => <span key={link.url} style={{...styles.badge, backgroundColor: '#3182ce'}}>{link.label}</span>)}
        </div>
      </div>
      <div style={styles.grid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section title="📝 Professional Summary"><p>{data.summary || 'No summary found.'}</p></Section>
          <Section title="💡 Skills">
            <h3 style={{fontWeight: '600'}}>Technical:</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px'}}>
              {technicalSkills.map(skill => <span key={skill} style={{...styles.badge, backgroundColor: '#38a169'}}>{skill}</span>)}
            </div>
            <h3 style={{fontWeight: '600', marginTop: '12px'}}>Soft:</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px'}}>
              {softSkills.map(skill => <span key={skill} style={{...styles.badge, backgroundColor: '#805ad5'}}>{skill}</span>)}
            </div>
          </Section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section title={`⭐ Resume Rating: ${data.resume_rating || 0}/10`}>
             <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{data.resume_rating || 0}/10</p>
          </Section>
          <Section title="🚀 Areas for Improvement">
            <ul style={{ listStylePosition: 'inside' }}>{improvementAreas.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </Section>
          <Section title="📚 Upskill Suggestions">
            <ul style={{ listStylePosition: 'inside' }}>{upskillSuggestions.map((item, i) => <li key={i}>{item.skill || item}</li>)}</ul>
          </Section>
        </div>
      </div>
    </div>
  );
};
export default ResultsDisplay;