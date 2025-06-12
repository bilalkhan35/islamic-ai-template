import { useEffect, useState } from "react";

export const useAsmaulHusna = (asmaNumber) => {
  const [asma, setAsma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsma = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://islamic-developers-api.p.rapidapi.com/al-asma-ul-husna?number=${asmaNumber}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "islamic-developers-api.p.rapidapi.com",
              "x-rapidapi-key": import.meta.env.VITE_ASMA_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAsma(data);
      } catch (err) {
        setError("Failed to load Asma. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsma();
  }, [asmaNumber]);

  return { asma, loading, error };
};
