// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// 💡 These are placeholder pages – users can replace them easily
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import InfoPage from "./pages/InfoPage";
import ExtraPage from "./pages/ExtraPage";
import Quran from "./pages/Quran";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Quran", path: "/quran" },
  { name: "AsmaUlHusna", path: "/daily-dua" },
  { name: "Hadith", path: "/hadith-of-the-day" },
  { name: "Islamic Q&A", path: "/qa" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 text-gray-800">
      {/* 🔼 Sticky header for navigation */}
      <Navbar title="Islamic AI" navLinks={navLinks} />

      {/* 🔽 Container for routed content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/chat"
              element={
                <ChatPage
                  title="Islamic Q&A"
                  placeholder="Ask a question about Islam..."
                  systemPrompt="You are a knowledgeable Islamic scholar. Use Quran and Hadith to answer kindly."
                />
              }
            />
            <Route path="/quran" element={<Quran />} />
            <Route path="/daily-dua" element={<ExtraPage />} />
            <Route path="/hadith-of-the-day" element={<InfoPage />} />
            <Route path="/qa" element={<ChatPage title="Islamic Q&A" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
