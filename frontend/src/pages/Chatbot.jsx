import { useState, useRef, useEffect } from 'react';
import API from '../api/axios';

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm your AI barista. Ask me anything about our menu!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to the newest message whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await API.post('/ai/chat', { messages: updatedMessages });
      setMessages([...updatedMessages, { role: 'model', text: res.data.reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'model', text: "Sorry, I'm having trouble right now. Try again in a moment!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-black text-white rounded-lg border border-gray-700 flex flex-col h-[500px]">
      <h2 className="text-xl font-bold mb-4">AI Barista Chat</h2>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-amber-400 text-black self-end'
                : 'bg-gray-800 text-white self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-800 text-gray-400 self-start p-3 rounded-lg italic">
            Barista is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask about our menu..."
    className="flex-1 p-2 rounded text-black bg-white"
  />
  <button
    type="submit"
    disabled={loading}
    className="bg-amber-400 text-black font-semibold px-4 rounded disabled:opacity-50"
  >
    Send
  </button>

      </form>
    </div>
  );
}

export default Chatbot;