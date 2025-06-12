import { useState } from "react";
import { useAsmaulHusna } from "../hooks/useAsmaUlHusna";

const AsmaulHusnaPage = () => {
  const [asmaNumber, setAsmaNumber] = useState(1);
  const { asma, loading, error } = useAsmaulHusna(asmaNumber);

  const handleNextAsma = () =>
    setAsmaNumber((prev) => (prev < 99 ? prev + 1 : 1));

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl mb-4 text-emerald-700 font-bold">
        الأسماء الحسنى
      </h1>

      <div className="bg-white shadow rounded p-6 max-w-xl mx-auto">
        {loading && <p className="text-gray-500">جاري التحميل...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {asma && !loading && (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              <span className="text-emerald-600">{asma.native}</span>
              <br />
              <span className="text-gray-500">{asma.latin}</span>
            </h2>

            {asma.en && <p className="text-gray-600 italic mb-4">{asma.en}</p>}

            <button
              onClick={handleNextAsma}
              className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              التالي
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
