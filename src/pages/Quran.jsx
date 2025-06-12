import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card"; // make sure this path is correct

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
            words: true,
            fields: "text_uthmani,translations",
            translations: "131,46",
          },
        }
      );

      const { verse } = response.data;

      const arabic = verse.text_uthmani || "Arabic not found.";
      const verseID = verse.verse_key || "";

      let english = "English translation not found.";
      let urdu = "Urdu translation not found.";

      verse.translations.forEach((t) => {
        if (t.language_name?.toLowerCase() === "english") english = t.text;
        if (t.language_name?.toLowerCase() === "urdu") urdu = t.text;
      });

      if (!english || /[ا-ی]/.test(english)) {
        english =
          "📘 English: This is what your Lord has revealed to you of wisdom...";
      }

      if (!urdu || /[a-zA-Z]/.test(urdu)) {
        urdu =
          "📗 Urdu: (یہ وہ (حکمت) ہے جو آپ کے رب نے آپ کی طرف وحی کی ہے...)";
      }

      setVerseArabic(arabic);
      setVerseEnglish(english);
      setVerseUrdu(urdu);
      setVerseKey(verseID);
    } catch (error) {
      setError(
        `Failed to fetch verse. Please try again later.${
          error.message ? ` Error: ${error.message}` : ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomVerse();
  }, []);

  const handleButtonClick = () => getRandomVerse();

  const saveToLocal = () => {
    const existing = JSON.parse(localStorage.getItem("favVerses")) || [];
    const verseData = { verseArabic, verseEnglish, verseUrdu, verseKey };
    localStorage.setItem("favVerses", JSON.stringify([...existing, verseData]));
    alert("Saved locally ✅");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card
        title="📖 Quranic Verse of the Day"
        footer={
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleButtonClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "🔁 Get Another Verse"}
            </button>
            <button
              onClick={saveToLocal}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              ⭐ Save Verse
            </button>
          </div>
        }
      >
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <p className="text-right text-2xl font-bold text-gray-800">
              {verseArabic}
            </p>
            <p className="text-gray-700">
              <strong>📘 English:</strong> {verseEnglish}
            </p>
            <p className="text-gray-700">
              <strong>📗 Urdu:</strong> {verseUrdu}
            </p>
            <p className="text-sm text-gray-500 text-right">({verseKey})</p>
          </>
        )}
      </Card>
    </div>
  );
}

export default Quran;
