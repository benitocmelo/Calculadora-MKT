import React, { useState, useRef, useEffect } from 'react';
import { CalculatorState, CalculatedMetrics, ChatMessage } from '../types';
import { sendMessageToMentor } from '../services/geminiService';

interface Props {
  state: CalculatorState;
  metrics: CalculatedMetrics;
}

export const MentorChat: React.FC<Props> = ({ state, metrics }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu Mentor Virtual de JUAN MKT. ¿En qué puedo ayudarte a mejorar tu rentabilidad hoy?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await sendMessageToMentor(userMsg, state, metrics);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#111] border border-emerald-500/30 w-[350px] h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden backdrop-blur-xl animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                <i className="fa-solid fa-robot text-emerald-300 text-sm"></i>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Mentor AI</h3>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider">Juan MKT Expert</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-[#222] text-gray-200 border border-white/5 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#222] rounded-2xl px-4 py-3 border border-white/5 rounded-tl-none">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#151515] border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta sobre tu estrategia..."
                className="flex-1 bg-black/30 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-lime-300 to-emerald-400 text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
      >
        {isOpen ? (
           <i className="fa-solid fa-chevron-down text-xl"></i>
        ) : (
           <i className="fa-solid fa-comment-dots text-2xl group-hover:animate-pulse"></i>
        )}
      </button>
    </div>
  );
};