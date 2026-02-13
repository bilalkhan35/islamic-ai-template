import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatPage({
  systemPrompt = "You are a helpful assistant.",
  title = "AI Chat",
  placeholder = "Ask your question...",
  apiUrl = "https://openrouter.ai/api/v1/chat/completions",
  model = "mistralai/mistral-7b-instruct",
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnswer = async (question) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const apiKey = import.meta.env.VITE_HF_TOKEN;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚙️ **Demo Mode** — To enable live AI responses, set `VITE_HF_TOKEN` in your `.env` file with an OpenRouter API key.\n\nThis is a template designed for Islamic Q&A. Once configured, you can ask questions about Islam and receive answers guided by the Quran and Hadith.",
          },
        ]);
        setLoading(false);
        return;
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
        }),
      });

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ API error. Please try again later.",
          },
        ]);
      } else {
        const data = await res.json();
        const reply =
          data.choices?.[0]?.message?.content || "No answer received.";
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
    <div className="animate-fade-in" style={{ padding: '0.5rem' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem 1rem 1.25rem',
        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
        marginBottom: '1rem',
      }}>
        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#047857',
          marginBottom: '0.25rem',
        }}>
          {title}
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
          Powered by AI • Guided by Quran & Hadith
        </p>
      </div>

      {/* Chat Messages */}
      <div style={{
        minHeight: '320px',
        maxHeight: '480px',
        overflowY: 'auto',
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {messages.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#9ca3af',
          }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🕌</p>
            <p style={{ fontSize: '0.9rem' }}>Ask any question about Islam...</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Questions will be answered with knowledge from Quran & Hadith
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fadeInUp 0.3s ease-out',
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '0.875rem 1.125rem',
              borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #059669, #047857)'
                : '#f3f4f6',
              color: msg.role === 'user' ? 'white' : '#374151',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              boxShadow: msg.role === 'user'
                ? '0 4px 12px rgba(5, 150, 105, 0.25)'
                : '0 2px 8px rgba(0, 0, 0, 0.04)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '1rem 1rem 1rem 0.25rem',
              background: '#f3f4f6',
              display: 'flex',
              gap: '0.35rem',
              alignItems: 'center',
            }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#9ca3af',
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
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem 0.25rem 0.25rem',
        borderTop: '1px solid rgba(16, 185, 129, 0.08)',
        marginTop: '0.75rem',
      }}>
        <textarea
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '0.875rem',
            border: '2px solid #e5e7eb',
            fontSize: '0.9rem',
            fontFamily: 'Inter, sans-serif',
            resize: 'none',
            outline: 'none',
            transition: 'border-color 0.25s ease',
            background: '#fafafa',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#10b981')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '0.875rem',
          }}
        >
          <FaPaperPlane size={14} />
        </button>
      </form>
    </div>
  );
}
