import { Link } from "react-router-dom";
import { FaQuran, FaMosque, FaStar, FaBookOpen } from "react-icons/fa";

const features = [
  {
    title: "Islamic Q&A",
    description: "Ask questions and get answers powered by AI, guided by Quran & Hadith.",
    path: "/qa",
    icon: FaBookOpen,
    gradient: "linear-gradient(135deg, #059669, #047857)",
  },
  {
    title: "Quran",
    description: "Read random verses from the Holy Quran with English & Urdu translations.",
    path: "/quran",
    icon: FaQuran,
    gradient: "linear-gradient(135deg, #0d9488, #0f766e)",
  },
  {
    title: "Asma ul Husna",
    description: "Explore the 99 beautiful Names of Allah with meanings & translations.",
    path: "/daily-dua",
    icon: FaStar,
    gradient: "linear-gradient(135deg, #d97706, #b45309)",
  },
  {
    title: "Hadith of the Day",
    description: "Read a daily Hadith to strengthen your Imaan and deepen your knowledge.",
    path: "/hadith-of-the-day",
    icon: FaMosque,
    gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem 1rem 3rem',
      }}>
        <div className="animate-float" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '1.25rem',
          background: 'linear-gradient(135deg, #059669, #047857)',
          boxShadow: '0 8px 24px rgba(5, 150, 105, 0.3)',
          marginBottom: '1.25rem',
        }}>
          <FaMosque color="white" size={32} />
        </div>

        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 800,
          color: '#064e3b',
          marginBottom: '0.75rem',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
        }}>
          Islamic AI
        </h1>

        <p style={{
          fontFamily: 'Amiri, serif',
          fontSize: '1.5rem',
          color: '#059669',
          marginBottom: '0.5rem',
          direction: 'rtl',
        }}>
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>

        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Your open-source Islamic knowledge companion. Explore the Quran, Hadith, and the 99 Names of Allah.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="stagger-children" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '0 0.5rem',
      }}>
        {features.map(({ title, description, path, icon: Icon, gradient }) => (
          <Link
            key={title}
            to={path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="premium-card" style={{
              padding: '1.5rem',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '0.875rem',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}>
                <Icon color="white" size={22} />
              </div>

              <h2 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '0.5rem',
              }}>
                {title}
              </h2>

              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                lineHeight: 1.6,
                flex: 1,
              }}>
                {description}
              </p>

              <div style={{
                marginTop: '1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}>
                Explore →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
