import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

// Translation resource IDs from quran.com API v4
const ENGLISH_TRANSLATION_ID = 20; // Saheeh International
const URDU_TRANSLATION_ID = 97;    // Fateh Muhammad Jalandhry

function Quran() {
  const [verseArabic, setVerseArabic] = useState("");
  const [verseEnglish, setVerseEnglish] = useState("");
  const [verseUrdu, setVerseUrdu] = useState("");
  const [verseKey, setVerseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomVerse = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://api.quran.com/api/v4/verses/random",
        {
          headers: { "Content-Type": "application/json" },
          params: {
            language: "en",
            words: false,
            fields: "text_uthmani",
            translations: `${ENGLISH_TRANSLATION_ID},${URDU_TRANSLATION_ID}`,
          },
        }
      );

      const { verse } = response.data;
      const arabic = verse.text_uthmani || "Arabic not found.";
      const verseID = verse.verse_key || "";

      let english = "English translation not found.";
      let urdu = "Urdu translation not found.";

      if (verse.translations && Array.isArray(verse.translations)) {
        verse.translations.forEach((t) => {
          if (t.resource_id === ENGLISH_TRANSLATION_ID) {
            // Strip HTML tags from translation text
            english = t.text?.replace(/<[^>]*>/g, "") || english;
          }
          if (t.resource_id === URDU_TRANSLATION_ID) {
            urdu = t.text?.replace(/<[^>]*>/g, "") || urdu;
          }
        });
      }

      setVerseArabic(arabic);
      setVerseEnglish(english);
      setVerseUrdu(urdu);
      setVerseKey(verseID);
    } catch (err) {
      setError(
        `Failed to fetch verse. Please try again later.${
          err.message ? ` Error: ${err.message}` : ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomVerse();
  }, []);

  const saveToLocal = () => {
    const existing = JSON.parse(localStorage.getItem("favVerses")) || [];
    const verseData = { verseArabic, verseEnglish, verseUrdu, verseKey };
    localStorage.setItem("favVerses", JSON.stringify([...existing, verseData]));
    alert("Verse saved to favorites ✅");
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem', maxWidth: '42rem', margin: '0 auto' }}>
      <Card
        title="📖 Quranic Verse"
        footer={
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
          }}>
            <button
              className="btn-primary"
              onClick={getRandomVerse}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                  Loading...
                </>
              ) : (
                "🔁 Get Another Verse"
              )}
            </button>
            <button onClick={saveToLocal} className="btn-secondary">
              ⭐ Save Verse
            </button>
          </div>
        }
      >
        {loading && !verseArabic ? (
          <div style={{ padding: '1rem' }}>
            <div className="skeleton skeleton-title" style={{ width: '80%', margin: '0 auto 1rem' }} />
            <div className="skeleton skeleton-block" />
            <div className="skeleton skeleton-text" style={{ width: '90%' }} />
            <div className="skeleton skeleton-text" style={{ width: '70%' }} />
          </div>
        ) : error ? (
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
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Arabic */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.04), rgba(16, 185, 129, 0.08))',
              borderRadius: '0.875rem',
              padding: '1.5rem',
              border: '1px solid rgba(16, 185, 129, 0.1)',
            }}>
              <p className="arabic-text" style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#1f2937',
                textAlign: 'center',
              }}>
                {verseArabic}
              </p>
            </div>

            {/* English */}
            <div style={{ padding: '0 0.5rem' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#059669',
                marginBottom: '0.375rem',
              }}>
                📘 English Translation
              </p>
              <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7 }}>
                {verseEnglish}
              </p>
            </div>

            {/* Urdu */}
            <div style={{ padding: '0 0.5rem' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#d97706',
                marginBottom: '0.375rem',
              }}>
                📗 Urdu Translation
              </p>
              <p className="arabic-text" style={{
                fontSize: '1.1rem',
                color: '#374151',
                lineHeight: 1.8,
              }}>
                {verseUrdu}
              </p>
            </div>

            {/* Verse Key */}
            {verseKey && (
              <p style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#9ca3af',
                background: '#f9fafb',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                width: 'fit-content',
                margin: '0 auto',
              }}>
                Surah:Ayah — {verseKey}
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Quran;
