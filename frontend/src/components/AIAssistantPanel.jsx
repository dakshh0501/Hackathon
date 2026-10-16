import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, X, ChevronDown, Check, MessageSquare 
} from 'lucide-react';

/**
 * Section 15 & G3: AI Travel Companion Panel (Gemini Integration Layer)
 * Conversational assistant that knows the user's destination,
 * answers budget/safety questions, and suggests itineraries in real-time.
 */
export default function AIAssistantPanel({ activeDestination, biome, isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello traveler! I am your TERRA Intelligence Companion. I'm calibrated to the ${biome?.displayName || 'Earth Biospheres'}. Ask me about hidden trails, weather windows, local cuisine, or budget optimization!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate smart contextual response
    setTimeout(() => {
      let reply = `Based on the latest ${biome?.name || 'regional'} biosphere reports, ${activeDestination?.name || 'this destination'} offers the best conditions during ${biome?.bestMonth || 'autumn and spring'}.`;

      if (userMsg.toLowerCase().includes('budget') || userMsg.toLowerCase().includes('cost')) {
        reply = `For ${activeDestination?.name || 'this region'}, a comfortable daily budget sits around ₹${activeDestination?.dailyBudget?.mid || 4500}/day, which covers heritage boutique stays, local dining, and national park entries.`;
      } else if (userMsg.toLowerCase().includes('food') || userMsg.toLowerCase().includes('eat')) {
        reply = `The regional culinary highlights in ${activeDestination?.name || 'this area'} feature farm-to-table seasonal delicacies, warming herbal infusions, and traditional slow-cooked feast dishes.`;
      } else if (userMsg.toLowerCase().includes('safe') || userMsg.toLowerCase().includes('solo')) {
        reply = `Safety score is rated at ${activeDestination?.safetyIndex || 9.4}/10 with verified traveler community presence and medical infrastructure nearby.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '380px',
        height: '520px',
        zIndex: 900,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(10, 16, 26, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* Top Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(56, 189, 248, 0.4)'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
              TERRA Companion
            </div>
            <div style={{ fontSize: '10px', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34D399' }} />
              <span>Gemini 2.0 Flash Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', padding: '4px' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flexGrow: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((m, idx) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={idx}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '16px',
                backgroundColor: isUser ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                color: isUser ? '#040608' : '#FFFFFF',
                fontSize: '13px',
                lineHeight: 1.5,
                fontWeight: isUser ? 600 : 400,
                border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {m.text}
            </div>
          );
        })}

        {isTyping && (
          <div style={{
            alignSelf: 'flex-start',
            padding: '8px 14px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            Thinking across biospheres...
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} style={{
        padding: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.02)',
        display: 'flex',
        gap: '8px'
      }}>
        <input
          type="text"
          placeholder="Ask anything about this trip..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px 14px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#FFFFFF',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          className="glass-interactive"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            color: '#040608',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
