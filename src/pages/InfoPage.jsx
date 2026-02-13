import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";

// Sample hadiths shown when no API key is set (demo mode)
const SAMPLE_HADITHS = [
  {
    book: { bookName: "Sahih Bukhari" },
    hadithNumber: "1",
    hadithEnglish: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.",
    englishNarrator: "Narrated 'Umar bin Al-Khattab (RA)",
    hadithUrdu: "اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی۔",
  },
  {
    book: { bookName: "Sahih Muslim" },
    hadithNumber: "2564",
    hadithEnglish: "None of you truly believes until he loves for his brother what he loves for himself.",
    englishNarrator: "Narrated Anas bin Malik (RA)",
    hadithUrdu: "تم میں سے کوئی اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔",
  },
  {
    book: { bookName: "Sahih Bukhari" },
    hadithNumber: "6018",
    hadithEnglish: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
    englishNarrator: "Narrated Abu Hurairah (RA)",
    hadithUrdu: "جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے اسے چاہیے کہ اچھی بات کہے یا خاموش رہے۔",
  },
];

const HadithoftheDay = () => {
  const [hadith, setHadith] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const apiKey = import.meta.env.VITE_HADITH_API_HADITH;

  const fetchHadith = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsDemo(false);

    // Demo mode — show sample hadith if API key is missing or placeholder
    if (!apiKey || apiKey === "your_api_key_here") {
      const randomIndex = Math.floor(Math.random() * SAMPLE_HADITHS.length);
      setTimeout(() => {
        setHadith(SAMPLE_HADITHS[randomIndex]);
        setIsDemo(true);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await axios.get("https://hadithapi.com/api/hadiths", {
        params: { apiKey },
      });

      const hadiths = response?.data?.hadiths?.data;
      if (hadiths && hadiths.length > 0) {
        const randomIndex = Math.floor(Math.random() * hadiths.length);
        setHadith(hadiths[randomIndex]);
      } else {
        setError("No hadiths found.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Network error or invalid response.");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchHadith();
  }, [fetchHadith]);

  return (
    <div className="animate-fade-in" style={{ padding: '1rem', maxWidth: '42rem', margin: '0 auto' }}>
      <Card
        title="📜 Hadith of the Day"
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={fetchHadith} className="btn-primary" disabled={loading}>
              {loading ? "Loading..." : "🔄 Load New Hadith"}
            </button>
          </div>
        }
      >
        {/* Demo mode banner */}
        {isDemo && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(217, 119, 6, 0.1))',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: '#92400e',
          }}>
            <span>⚙️</span>
            <span><strong>Demo Mode</strong> — Set <code style={{ background: '#fef3c7', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>VITE_HADITH_API_HADITH</code> in .env for live data.</span>
          </div>
        )}

        {error && (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '0.75rem',
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</p>
            <p>{error}</p>
          </div>
        )}

        {!error && loading && (
          <div style={{ padding: '1rem' }}>
            <div className="skeleton skeleton-text" style={{ width: '40%' }} />
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-text" style={{ width: '60%' }} />
            <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          </div>
        )}

        {!error && !loading && hadith && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Source Badge */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                padding: '0.35rem 0.875rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}>
                {hadith.book.bookName}
              </span>
              <span style={{
                background: '#f3f4f6',
                color: '#6b7280',
                padding: '0.35rem 0.875rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}>
                Hadith #{hadith.hadithNumber}
              </span>
            </div>

            {/* English Hadith */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.03), rgba(16, 185, 129, 0.06))',
              borderRadius: '0.875rem',
              padding: '1.25rem',
              border: '1px solid rgba(16, 185, 129, 0.08)',
              borderLeft: '4px solid #059669',
            }}>
              <p style={{
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}>
                "{hadith.hadithEnglish}"
              </p>
            </div>

            {/* Narrator */}
            <p style={{
              textAlign: 'center',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#059669',
            }}>
              — {hadith.englishNarrator}
            </p>

            {/* Urdu */}
            {hadith.hadithUrdu && (
              <div style={{
                background: '#fafafa',
                borderRadius: '0.875rem',
                padding: '1.25rem',
                border: '1px solid #f3f4f6',
                borderRight: '4px solid #d97706',
              }}>
                <p style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#d97706',
                  marginBottom: '0.5rem',
                }}>
                  Urdu
                </p>
                <p className="arabic-text" style={{
                  fontSize: '1.05rem',
                  color: '#374151',
                  lineHeight: 1.8,
                }}>
                  {hadith.hadithUrdu}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HadithoftheDay;
