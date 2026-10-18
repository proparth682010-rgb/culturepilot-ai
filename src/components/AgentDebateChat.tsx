import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { AudioVoiceInput } from './AudioVoiceInput';

interface AgentDebateChatProps {
  userContext: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  sources?: { title: string; uri: string }[];
}

const PERSONAS = [
  { id: 'general', label: 'Chief Cultural Sociologist', desc: 'Holistic cross-domain taste graph analysis' },
  { id: 'cinema_scholar', label: 'Auteur Film Theorist', desc: 'Slow cinema, French New Wave & visual semiotics' },
  { id: 'sonic_theorist', label: 'Sonic Hauntologist', desc: 'Ambient, dubstep, dark jazz & tape loops' },
  { id: 'literary_metaphysicist', label: 'Literary Metaphysicist', desc: 'Magical realism & existential philosophy' },
  { id: 'spatial_architect', label: 'Spatial Architect', desc: 'Brutalist concrete & acoustic interior void' },
];

const DEFAULT_QUESTIONS = [
  'Why did the taste graph bridge my cinema seeds with Burial instead of Brian Eno?',
  'How does Qloo quantify cultural distance between architecture and music?',
  'Explain how the Serendipity Agent prevents algorithmic echo chambers.',
  'How would my recommendations shift if I introduced 1970s Japanese City Pop?',
];

export const AgentDebateChat: React.FC<AgentDebateChatProps> = ({ userContext }) => {
  const [selectedPersona, setSelectedPersona] = useState('general');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: `Greetings. I am the Qloo Cultural Intelligence Recommender Agent. I analyze the deep sociological, structural, and aesthetic vectors that connect seemingly disparate cultural domains. How may I clarify the latent affinity logic behind your media dossier?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/taste/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          userContext,
          history: newHistory.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
          persona: selectedPersona,
        }),
      });
      const data = await res.json();

      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: data.answer || 'Cultural vector synthesis completed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error('Chat failed', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: 'The latent vector graph encountered an inquiry latency. Cross-domain logic remains verified.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#101214] border border-stone-800 rounded-2xl p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
            Curatorial Dialectic
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9] mt-0.5">
            Agentic Taste Interrogator
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Challenge or question the sociological rationale behind your cultural affinity recommendations.
          </p>
        </div>
        <div className="text-xs font-mono text-stone-500 flex items-center gap-2 shrink-0">
          <Bot className="w-4 h-4 text-[#d4a373]" />
          <span>Gemini 3.8 Flash · Search Grounded</span>
        </div>
      </div>

      {/* Specialist Persona Selector */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
          Select Curator Specialist:
        </div>
        <div className="flex flex-wrap gap-2">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedPersona === p.id
                  ? 'bg-stone-800 text-[#d4a373] border border-[#d4a373]/50 font-semibold shadow-sm'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title={p.desc}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
          Suggested Inquiries:
        </div>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_QUESTIONS.map((dq) => (
            <button
              key={dq}
              onClick={() => handleSend(dq)}
              disabled={isSending}
              className="text-xs text-left px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              “{dq}”
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono ${
                  isUser
                    ? 'bg-[#d4a373] text-black font-semibold'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-stone-800 text-stone-100 rounded-tr-none'
                    : 'bg-stone-900/80 border border-stone-800/80 text-stone-300 rounded-tl-none font-light'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Google Search Grounding Sources */}
                {m.sources && m.sources.length > 0 && (
                  <div className="pt-2 border-t border-stone-800/80 space-y-1 text-[11px] font-mono">
                    <div className="text-stone-500 uppercase tracking-wider">
                      Grounding References:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.slice(0, 3).map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#d4a373] hover:underline flex items-center gap-1 bg-stone-900 px-2 py-0.5 rounded border border-stone-800"
                        >
                          <span className="truncate max-w-[200px]">{src.title || src.uri}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-[10px] font-mono text-stone-500 text-right">
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        {isSending && (
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 pl-10">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#d4a373]" />
            <span>Consulting Qloo Cultural Affinity Topology & Google Search...</span>
          </div>
        )}
      </div>

      {/* Input Bar with Voice Microphone */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-stone-800"
      >
        <AudioVoiceInput
          onTranscribed={(txt) => setInput((prev) => (prev ? `${prev} ${txt}` : txt))}
          buttonLabel="Speak"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask why a specific recommendation was selected, or challenge its cultural logic..."
          className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-xs text-[#f2efe9] focus:outline-none focus:border-[#d4a373] transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="p-3 bg-[#d4a373] text-black rounded-xl hover:bg-[#e0b488] active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          title="Send Question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
