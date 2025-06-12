import { Link } from "react-router-dom";

const features = [
  {
    title: "Islamic Q&A",
    description: "Ask questions and get Quran/Hadith-based answers.",
    path: "/qa",
  },
  {
    title: "Quran",
    description: "Read and reflect on the Book of Allah.",
    path: "/quran",
  },
  {
    title: "Asma Ul Husna",
    description: "Learn and understand the 99 Names of Allah.",
    path: "/daily-dua",
  },
  {
    title: "Hadith of the Day",
    description: "Read a daily Hadith to strengthen your Imaan.",
    path: "/hadith-of-the-day",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <main className="w-full max-w-6xl py-10 grid gap-8 grid-cols-1 md:grid-cols-2">
        {features.map(({ title, description, path }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link
              to={path}
              className="inline-block mt-auto text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded"
            >
              Go to {title}
            </Link>
          </div>
        ))}
      </main>
      <footer className="text-sm text-gray-500 mt-10 pb-6">
        &copy; 2025 Islamic AI. All rights reserved.
      </footer>
    </div>
  );
}
