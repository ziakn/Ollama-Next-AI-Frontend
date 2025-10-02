import { useEffect, useState } from "react";

export default function PersonalSpeechAssistant({ bot, chatRef, messages, loading, handleSend }) {
  const [input, setInput] = useState('');

  const onClickHandler = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(input);

    if (!input.trim()) return;

    handleSend(input); // Pass input to the parent function
    setInput(''); // Clear input
  };
  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === 'bot') {
      speakText(lastMsg.text);
    }
  }, [messages]);

  function speakText(messages) {
    console.log("reached",messages)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages);
      utterance.lang = 'en-US';
      utterance.rate = 1; // speed (0.1 to 10)
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser.");
    }
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-4">
        <div
          className="text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3 shadow"
          style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #ff00e4, #f22f10)',
            boxShadow: '0 4px 12px rgb(255 0 0)',
          }}
        >
          <i className={`bi ${bot.icon} fs-2`}></i>
        </div>
        <h3 className="fw-bold">{bot.name}</h3>
        <span className="badge bg-primary mb-2">
          <i className={`bi ${bot.badgeIcon} me-1`}></i> {bot.type}
        </span>
        <p className="text-muted">{bot.description}</p>
      </div>

      {/* Chat Window */}
      <div
        ref={chatRef}
        className="rounded-4 shadow-sm border p-4 bg-light mb-4"
        style={{ maxHeight: '450px', overflowY: 'auto', minHeight: '300px' }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
          >
            <div
              className={`p-3 rounded-4 ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border text-dark'
              }`}
              style={{ maxWidth: '75%' }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="d-flex justify-content-start mb-3">
            <div className="p-3 rounded-4 bg-white border text-muted">
              Bot is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onClickHandler} className="d-flex gap-2">
        <input
          type="text"
          className="form-control rounded-pill px-4"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary rounded-pill px-4" type="submit" disabled={loading}>
          <i className="bi bi-send"></i>
        </button>
      </form>
    </>
  );
}
