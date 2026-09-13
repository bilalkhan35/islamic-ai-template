import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

// Simple inline markdown parser
const parseInline = (text) => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.06);padding:0.15rem 0.3rem;border-radius:4px;font-family:monospace;font-size:0.9em">$1</code>')
    .replace(/\n/g, '<br/>');
};

const FormattedMessage = ({ content }) => {
  if (!content) return null;
  // Split by double newline for paragraphs
  const blocks = content.split(/\n{2,}/);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {blocks.map((block, i) => {
        // Basic list detection
        if (block.match(/^[-*]\s/m) || block.match(/^\d+\.\s/m)) {
          const items = block.split('\n');
          return (
            <ul key={i} style={{ paddingLeft: "1.5rem", margin: 0, listStyleType: "disc" }}>
              {items.map((item, j) => {
                const text = item.replace(/^[-*]\s/, '').replace(/^\d+\.\s/, '');
                return (
                  <li 
                    key={j} 
                    style={{ marginBottom: "0.5rem" }} 
                    dangerouslySetInnerHTML={{ __html: parseInline(text) }} 
                  />
                );
              })}
            </ul>
          );
        }
        
        // Headings
        if (block.startsWith('### ')) {
          return <h3 key={i} style={{ fontSize: "1.15rem", fontWeight: 600, color: "#111827", margin: 0, fontFamily: "Outfit, sans-serif" }} dangerouslySetInnerHTML={{ __html: parseInline(block.replace(/^###\s/, '')) }} />;
        }
        if (block.startsWith('## ')) {
          return <h2 key={i} style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111827", margin: 0, fontFamily: "Outfit, sans-serif" }} dangerouslySetInnerHTML={{ __html: parseInline(block.replace(/^##\s/, '')) }} />;
        }
        if (block.startsWith('# ')) {
          return <h1 key={i} style={{ fontSize: "1.5rem", fontWeight: 800, color: "#047857", margin: 0, fontFamily: "Outfit, sans-serif" }} dangerouslySetInnerHTML={{ __html: parseInline(block.replace(/^#\s/, '')) }} />;
        }

        // Paragraph
        return (
          <p 
            key={i} 
            style={{ margin: 0 }} 
            dangerouslySetInnerHTML={{ __html: parseInline(block) }} 
          />
        );
      })}
    </div>
  );
};

export default function ChatPage({
  systemPrompt = "You are a helpful assistant.",
  title = "AI Chat",
  placeholder = "Ask your question...",
  apiUrl = "/api/chat",
  model = "google/gemini-2.5-flash",
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnswer = async (question) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          message: question,
          systemPrompt,
          title,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorData.error?.message || "⚠️ API error. Please try again later.",
          },
        ]);
      } else {
        const data = await res.json();
        const reply = data.reply || "No answer received.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Something went wrong. ${err.message || "Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      fetchAnswer(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: "0.5rem" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "1.5rem 1rem 1.25rem",
          borderBottom: "1px solid rgba(16, 185, 129, 0.1)",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#047857",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
          Powered by AI • Guided by Quran & Hadith
        </p>
      </div>

      {/* Chat Messages */}
      <div
        style={{
          minHeight: "320px",
          maxHeight: "550px",
          overflowY: "auto",
          padding: "1rem 0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {messages.length === 0 && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1rem",
              color: "#9ca3af",
            }}
          >
            <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🕌</p>
            <p style={{ fontSize: "1.1rem", color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
              Ask any question about Islam...
            </p>
            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "#9ca3af" }}>
              Answers guided by authentic knowledge
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            {msg.role === "user" ? (
              <div
                style={{
                  maxWidth: "75%",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "1.25rem 1.25rem 0.25rem 1.25rem",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  color: "white",
                  fontSize: "0.95rem",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.5,
                  boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {msg.content}
              </div>
            ) : (
              <div
                style={{
                  maxWidth: "90%",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
                  background: "#ffffff",
                  color: "#1f2937", // Darker gray for better readability
                  fontSize: "1.05rem", // Larger font for reading
                  fontFamily: '"Inter", "Amiri", sans-serif',
                  lineHeight: 1.8, // Better line height for long texts
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)", // Soft shadow
                  border: "1px solid rgba(0,0,0,0.05)",
                  wordBreak: "break-word",
                }}
              >
                <FormattedMessage content={msg.content} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderRadius: "1.25rem 1.25rem 1.25rem 0.25rem",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10b981",
                    animation: `float 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "1rem 0.5rem",
          borderTop: "1px solid rgba(16, 185, 129, 0.1)",
          marginTop: "0.5rem",
        }}
      >
        <textarea
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            flex: 1,
            padding: "0.875rem 1.25rem",
            borderRadius: "1.25rem",
            border: "2px solid #e5e7eb",
            fontSize: "0.95rem",
            fontFamily: "Inter, sans-serif",
            resize: "none",
            outline: "none",
            transition: "all 0.25s ease",
            background: "#ffffff",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#10b981";
            e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{
            padding: "0 1.25rem",
            borderRadius: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%", // match textarea height implicitly by flex alignment in parent
            background: "linear-gradient(135deg, #059669, #047857)",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease, opacity 0.2s",
            opacity: (loading || !input.trim()) ? 0.6 : 1,
          }}
        >
          <FaPaperPlane size={16} />
        </button>
      </form>
    </div>
  );
}
