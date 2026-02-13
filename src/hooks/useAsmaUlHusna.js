import { useEffect, useState } from "react";

// Complete 99 Names of Allah dataset — no API dependency needed
const ASMA_UL_HUSNA = [
  { number: 1, name: "ٱلرَّحْمَـٰنُ", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { number: 2, name: "ٱلرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful" },
  { number: 3, name: "ٱلْمَلِكُ", transliteration: "Al-Malik", meaning: "The King" },
  { number: 4, name: "ٱلْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy" },
  { number: 5, name: "ٱلسَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { number: 6, name: "ٱلْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Guardian of Faith" },
  { number: 7, name: "ٱلْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Protector" },
  { number: 8, name: "ٱلْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { number: 9, name: "ٱلْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { number: 10, name: "ٱلْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Greatest" },
  { number: 11, name: "ٱلْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { number: 12, name: "ٱلْبَارِئُ", transliteration: "Al-Bari'", meaning: "The Evolver" },
  { number: 13, name: "ٱلْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { number: 14, name: "ٱلْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Forgiver" },
  { number: 15, name: "ٱلْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The Subduer" },
  { number: 16, name: "ٱلْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { number: 17, name: "ٱلرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Provider" },
  { number: 18, name: "ٱلْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener" },
  { number: 19, name: "ٱلْعَلِيمُ", transliteration: "Al-Alim", meaning: "The All-Knowing" },
  { number: 20, name: "ٱلْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Restrainer" },
  { number: 21, name: "ٱلْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander" },
  { number: 22, name: "ٱلْخَافِضُ", transliteration: "Al-Khafid", meaning: "The Abaser" },
  { number: 23, name: "ٱلرَّافِعُ", transliteration: "Ar-Rafi'", meaning: "The Exalter" },
  { number: 24, name: "ٱلْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Bestower of Honor" },
  { number: 25, name: "ٱلْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "The Humiliator" },
  { number: 26, name: "ٱلسَّمِيعُ", transliteration: "As-Sami'", meaning: "The All-Hearing" },
  { number: 27, name: "ٱلْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing" },
  { number: 28, name: "ٱلْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge" },
  { number: 29, name: "ٱلْعَدْلُ", transliteration: "Al-Adl", meaning: "The Just" },
  { number: 30, name: "ٱللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Subtle One" },
  { number: 31, name: "ٱلْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware" },
  { number: 32, name: "ٱلْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Forbearing" },
  { number: 33, name: "ٱلْعَظِيمُ", transliteration: "Al-Azim", meaning: "The Magnificent" },
  { number: 34, name: "ٱلْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The Forgiving" },
  { number: 35, name: "ٱلشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Grateful" },
  { number: 36, name: "ٱلْعَلِيُّ", transliteration: "Al-Ali", meaning: "The Most High" },
  { number: 37, name: "ٱلْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Most Great" },
  { number: 38, name: "ٱلْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver" },
  { number: 39, name: "ٱلْمُقِيتُ", transliteration: "Al-Muqit", meaning: "The Nourisher" },
  { number: 40, name: "ٱلْحَسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner" },
  { number: 41, name: "ٱلْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic" },
  { number: 42, name: "ٱلْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Generous" },
  { number: 43, name: "ٱلرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Watchful" },
  { number: 44, name: "ٱلْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive" },
  { number: 45, name: "ٱلْوَاسِعُ", transliteration: "Al-Wasi'", meaning: "The All-Encompassing" },
  { number: 46, name: "ٱلْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The Wise" },
  { number: 47, name: "ٱلْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Loving" },
  { number: 48, name: "ٱلْمَجِيدُ", transliteration: "Al-Majid", meaning: "The Glorious" },
  { number: 49, name: "ٱلْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector" },
  { number: 50, name: "ٱلشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The Witness" },
  { number: 51, name: "ٱلْحَقُّ", transliteration: "Al-Haqq", meaning: "The Truth" },
  { number: 52, name: "ٱلْوَكِيلُ", transliteration: "Al-Wakil", meaning: "The Trustee" },
  { number: 53, name: "ٱلْقَوِيُّ", transliteration: "Al-Qawiyy", meaning: "The Most Strong" },
  { number: 54, name: "ٱلْمَتِينُ", transliteration: "Al-Matin", meaning: "The Firm" },
  { number: 55, name: "ٱلْوَلِيُّ", transliteration: "Al-Waliyy", meaning: "The Protecting Friend" },
  { number: 56, name: "ٱلْحَمِيدُ", transliteration: "Al-Hamid", meaning: "The Praiseworthy" },
  { number: 57, name: "ٱلْمُحْصِيُ", transliteration: "Al-Muhsi", meaning: "The Appraiser" },
  { number: 58, name: "ٱلْمُبْدِئُ", transliteration: "Al-Mubdi'", meaning: "The Originator" },
  { number: 59, name: "ٱلْمُعِيدُ", transliteration: "Al-Mu'id", meaning: "The Restorer" },
  { number: 60, name: "ٱلْمُحْيِيُ", transliteration: "Al-Muhyi", meaning: "The Giver of Life" },
  { number: 61, name: "ٱلْمُمِيتُ", transliteration: "Al-Mumit", meaning: "The Taker of Life" },
  { number: 62, name: "ٱلْحَيُّ", transliteration: "Al-Hayy", meaning: "The Ever-Living" },
  { number: 63, name: "ٱلْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "The Self-Existing" },
  { number: 64, name: "ٱلْوَاجِدُ", transliteration: "Al-Wajid", meaning: "The Finder" },
  { number: 65, name: "ٱلْمَاجِدُ", transliteration: "Al-Majid", meaning: "The Noble" },
  { number: 66, name: "ٱلْوَاحِدُ", transliteration: "Al-Wahid", meaning: "The One" },
  { number: 67, name: "ٱلْأَحَدُ", transliteration: "Al-Ahad", meaning: "The Unique" },
  { number: 68, name: "ٱلصَّمَدُ", transliteration: "As-Samad", meaning: "The Eternal Refuge" },
  { number: 69, name: "ٱلْقَادِرُ", transliteration: "Al-Qadir", meaning: "The Able" },
  { number: 70, name: "ٱلْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "The Powerful" },
  { number: 71, name: "ٱلْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "The Expediter" },
  { number: 72, name: "ٱلْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer" },
  { number: 73, name: "ٱلْأَوَّلُ", transliteration: "Al-Awwal", meaning: "The First" },
  { number: 74, name: "ٱلْآخِرُ", transliteration: "Al-Akhir", meaning: "The Last" },
  { number: 75, name: "ٱلظَّاهِرُ", transliteration: "Az-Zahir", meaning: "The Manifest" },
  { number: 76, name: "ٱلْبَاطِنُ", transliteration: "Al-Batin", meaning: "The Hidden" },
  { number: 77, name: "ٱلْوَالِي", transliteration: "Al-Wali", meaning: "The Governor" },
  { number: 78, name: "ٱلْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Most Exalted" },
  { number: 79, name: "ٱلْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness" },
  { number: 80, name: "ٱلتَّوَّابُ", transliteration: "At-Tawwab", meaning: "The Acceptor of Repentance" },
  { number: 81, name: "ٱلْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "The Avenger" },
  { number: 82, name: "ٱلْعَفُوُّ", transliteration: "Al-Afuww", meaning: "The Pardoner" },
  { number: 83, name: "ٱلرَّءُوفُ", transliteration: "Ar-Ra'uf", meaning: "The Compassionate" },
  { number: 84, name: "مَالِكُ ٱلْمُلْكِ", transliteration: "Malik-ul-Mulk", meaning: "Owner of Sovereignty" },
  { number: 85, name: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ", transliteration: "Dhul-Jalali wal-Ikram", meaning: "Lord of Majesty and Generosity" },
  { number: 86, name: "ٱلْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "The Equitable" },
  { number: 87, name: "ٱلْجَامِعُ", transliteration: "Al-Jami'", meaning: "The Gatherer" },
  { number: 88, name: "ٱلْغَنِيُّ", transliteration: "Al-Ghaniyy", meaning: "The Self-Sufficient" },
  { number: 89, name: "ٱلْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher" },
  { number: 90, name: "ٱلْمَانِعُ", transliteration: "Al-Mani'", meaning: "The Preventer" },
  { number: 91, name: "ٱلضَّارُّ", transliteration: "Ad-Darr", meaning: "The Distresser" },
  { number: 92, name: "ٱلنَّافِعُ", transliteration: "An-Nafi'", meaning: "The Benefactor" },
  { number: 93, name: "ٱلنُّورُ", transliteration: "An-Nur", meaning: "The Light" },
  { number: 94, name: "ٱلْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide" },
  { number: 95, name: "ٱلْبَدِيعُ", transliteration: "Al-Badi'", meaning: "The Originator" },
  { number: 96, name: "ٱلْبَاقِي", transliteration: "Al-Baqi", meaning: "The Everlasting" },
  { number: 97, name: "ٱلْوَارِثُ", transliteration: "Al-Warith", meaning: "The Inheritor" },
  { number: 98, name: "ٱلرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "The Guide to the Right Path" },
  { number: 99, name: "ٱلصَّبُورُ", transliteration: "As-Sabur", meaning: "The Patient" },
];

export const useAsmaulHusna = (asmaNumber) => {
  const [asma, setAsma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate a brief loading state for smooth transitions
    const timer = setTimeout(() => {
      const index = Math.max(0, Math.min(asmaNumber - 1, 98));
      const found = ASMA_UL_HUSNA[index];

      if (found) {
        setAsma({
          number: found.number,
          native: found.name,
          latin: found.transliteration,
          en: found.meaning,
        });
      } else {
        setError("Name not found.");
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [asmaNumber]);

  return { asma, loading, error, total: 99 };
};
