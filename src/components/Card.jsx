const Card = ({ title, children, footer }) => (
  <div className="premium-card animate-fade-in-up" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
    {/* Top gradient accent */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #059669, #10b981, #f59e0b)',
      borderRadius: '1rem 1rem 0 0',
    }} />
    
    {title && (
      <h2 style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        textAlign: 'center',
        color: '#047857',
        marginBottom: '1.25rem',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h2>
    )}
    
    <div style={{ lineHeight: 1.7, color: '#374151' }}>{children}</div>
    
    {footer && <div style={{ marginTop: '1.5rem' }}>{footer}</div>}
  </div>
);

export default Card;
