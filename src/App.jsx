// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import InfoPage from "./pages/InfoPage";
import ExtraPage from "./pages/ExtraPage";
import Quran from "./pages/Quran";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Quran", path: "/quran" },
  { name: "Asma ul Husna", path: "/daily-dua" },
  { name: "Hadith", path: "/hadith-of-the-day" },
  { name: "Islamic Q&A", path: "/qa" },
];

export default function App() {
  return (
    <div className="islamic-pattern-bg" style={{ minHeight: '100vh' }}>
      <Navbar title="Islamic AI" navLinks={navLinks} />

      <main style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '1.5rem 1rem 3rem',
      }}>
        <div className="animate-fade-in-up" style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '1.25rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)',
          minHeight: '60vh',
        }}>
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
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem 1rem',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem',
        fontFamily: 'Inter, sans-serif',
      }}>
        <p>© 2025 Islamic AI. Built with ❤️ for the Ummah.</p>
      </footer>
    </div>
  );
}
