import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../components/Card";

const HadithoftheDay = () => {
  const [hadith, setHadith] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_HADITH_API_HADITH;

  const fetchHadith = useCallback(async () => {
    if (!apiKey) {
      setError(
        "API key is missing. Please set VITE_HADITH_API_HADITH in your .env file."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://hadithapi.com/api/hadiths/?apiKey=${apiKey}`
      );

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
    <Card
      title="Hadith of the Day"
      footer={
        <div className="flex justify-center">
          <button
            onClick={fetchHadith}
            className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Load New Hadith
          </button>
        </div>
      }
    >
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!error && loading && <p className="text-center">Loading hadith...</p>}

      {!error && !loading && hadith && (
        <>
          <p>
            <strong>Source:</strong> {hadith.book.bookName}{" "}
            {hadith.hadithNumber}
          </p>
          <p>
            <strong>Hadith:</strong> {hadith.hadithEnglish}
          </p>
          <p>
            <strong>Narrator:</strong> {hadith.englishNarrator}
          </p>
          <p>
            <strong>Urdu:</strong> {hadith.hadithUrdu}
          </p>
        </>
      )}
    </Card>
  );
};

export default HadithoftheDay;
