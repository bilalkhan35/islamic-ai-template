import { useState } from "react";
import { useAsmaulHusna } from "../hooks/useAsmaUlHusna";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AsmaulHusnaPage = () => {
  const [asmaNumber, setAsmaNumber] = useState(1);
  const { asma, loading, error, total } = useAsmaulHusna(asmaNumber);

  const handleNext = () =>
    setAsmaNumber((prev) => (prev < 99 ? prev + 1 : 1));
  const handlePrev = () =>
    setAsmaNumber((prev) => (prev > 1 ? prev - 1 : 99));

  return (
    <div className="animate-fade-in" style={{
      padding: '1.5rem 1rem',
      maxWidth: '36rem',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#047857',
          marginBottom: '0.25rem',
        }}>
          Asma ul Husna
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
          The 99 Beautiful Names of Allah
        </p>
      </div>

      {/* Main Name Card */}
      <div className="premium-card" style={{
        padding: '2.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'pulse-glow 4s ease-in-out infinite',
      }}>
        {/* Top gradient accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #059669, #10b981, #f59e0b, #10b981, #059669)',
        }} />

        {/* Number badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
          marginBottom: '1.5rem',
        }}>
          {asmaNumber}
        </div>

        {loading ? (
          <div style={{ padding: '2rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : error ? (
          <div style={{
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</p>
            <p>{error}</p>
          </div>
        ) : asma ? (
          <div className="animate-fade-in" key={asmaNumber}>
            {/* Arabic Name */}
            <p className="arabic-text" style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 700,
              color: '#064e3b',
              marginBottom: '1rem',
              lineHeight: 1.4,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}>
              {asma.native}
            </p>

            {/* Transliteration */}
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#059669',
              marginBottom: '0.5rem',
              letterSpacing: '0.02em',
            }}>
              {asma.latin}
            </p>

            {/* English Meaning */}
            {asma.en && (
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontStyle: 'italic',
              }}>
                "{asma.en}"
              </p>
            )}
          </div>
        ) : null}

        {/* Navigation Arrows */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '2rem',
        }}>
          <button
            onClick={handlePrev}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #e5e7eb',
              background: 'white',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.color = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#374151';
            }}
            aria-label="Previous name"
          >
            <FaChevronLeft size={14} />
          </button>

          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#059669',
            }}>
              {asmaNumber}
            </span>
            <div style={{
              width: '100px',
              height: '4px',
              background: '#e5e7eb',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(asmaNumber / total) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #059669, #10b981)',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#9ca3af',
            }}>
              {total}
            </span>
          </div>

          <button
            onClick={handleNext}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #e5e7eb',
              background: 'white',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.color = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#374151';
            }}
            aria-label="Next name"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Jump */}
      <div style={{
        marginTop: '1.25rem',
        textAlign: 'center',
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: '#6b7280',
        }}>
          Jump to:
          <input
            type="number"
            min={1}
            max={99}
            value={asmaNumber}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (val >= 1 && val <= 99) setAsmaNumber(val);
            }}
            style={{
              width: '60px',
              padding: '0.4rem 0.5rem',
              borderRadius: '0.5rem',
              border: '2px solid #e5e7eb',
              textAlign: 'center',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#047857',
              outline: 'none',
              transition: 'border-color 0.25s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#10b981')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          />
        </label>
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
