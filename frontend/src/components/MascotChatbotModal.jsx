import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, X, Compass, MapPin, 
  ArrowRight, ShieldCheck, DollarSign, Calendar 
} from 'lucide-react';
import { searchAllIndia, ALL_INDIAN_DESTINATIONS } from '../data/allIndiaDestinations';

/**
 * Backpack Mascot AI Travel Chatbot:
 * - Appears right from the mascot bag
 * - Allows conversational search across any Indian city, state, or region
 * - Provides live itinerary suggestions, optimal travel seasons, and budget estimates
 * - Features one-click "View Full Guide" to immediately open the searched destination
 */
export default function MascotChatbotModal({ isOpen, onClose, onSelectDestination }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! I'm your TravelTales Backpack Companion 🎒. Tell me what city or state in India you want to explore (e.g., Delhi, Jaipur, Goa, Manali, Kerala, Kashmir), or ask me to plan your trip!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    // Search destination match
    setTimeout(() => {
      const match = searchAllIndia(query);

      let reply = `I found wonderful travel insights for **${match.name}** (${match.state})!`;
      reply += `\n\n• **Highlights**: ${match.highlights.slice(0, 3).join(', ')}`;
      reply += `\n• **Best Time**: ${match.bestMonths}`;
      reply += `\n• **Estimated Budget**: Around ₹${match.budget.mid.toLocaleString('en-IN')}/day for a comfortable stay.`;

      setMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: reply,
          matchedDestination: match
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '400px',
        height: '560px',
        zIndex: 900,
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(8, 14, 24, 0.94)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* Mascot Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(217, 119, 6, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            border: '1px solid rgba(217, 119, 6, 0.4)'
          }}>
            🎒
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
              TravelTales Backpack Bot
            </div>
            <div style={{ fontSize: '10px', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34D399' }} />
              <span>All India Search & Planner Active</span>
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
                maxWidth: '90%',
                padding: '12px 14px',
                borderRadius: '16px',
                backgroundColor: isUser ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                color: isUser ? '#040608' : '#FFFFFF',
                fontSize: '13px',
                lineHeight: 1.5,
                fontWeight: isUser ? 600 : 400,
                border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                whiteSpace: 'pre-line'
              }}
            >
              <div>{m.text}</div>

              {/* Action Button if destination was matched */}
              {m.matchedDestination && (
                <button
                  onClick={() => {
                    onSelectDestination(m.matchedDestination);
                    onClose();
                  }}
                  className="glass-interactive"
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: 'rgba(56, 189, 248, 0.25)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MapPin size={13} />
                  <span>Explore {m.matchedDestination.name}</span>
                  <ArrowRight size={13} />
                </button>
              )}
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
            Searching destinations across India...
          </div>
        )}
      </div>

      {/* Suggested Quick Cities */}
      <div style={{
        padding: '6px 12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        {['Delhi', 'Jaipur', 'Goa', 'Manali', 'Kerala', 'Kashmir'].map((c) => (
          <button
            key={c}
            onClick={() => {
              setInput(c);
            }}
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSend} style={{
        padding: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.04)',
        display: 'flex',
        gap: '8px'
      }}>
        <input
          type="text"
          placeholder="Ask me: 'Show Delhi', 'Plan Jaipur trip'..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
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
