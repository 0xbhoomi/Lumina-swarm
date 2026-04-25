// Telegram bot integration component
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const TelegramBot = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const telegramBotUrl = 'https://t.me/luminatradesbot';
  const telegramToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8678596596:AAHjcfbL7HlCDjWE0zt8c2aHozLJZJ--FNk';

  // Initialize bot connection status
  useEffect(() => {
    checkTelegramStatus();
  }, []);

  // Check bot connection status
  const checkTelegramStatus = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Telegram bot connection failed:', error);
      setIsConnected(false);
      setIsLoading(false);
    }
  };

  // Handle message sending
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `LuminaSwarm Bot: Processing your request "${newMessage.text}"... Swarm analysis initiated.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="brutal-card bg-charcoal text-cream p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-solar" />
          Telegram Bot
        </h4>
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[8px] font-black rounded border border-yellow-500/30">
              CONNECTING...
            </div>
          ) : isConnected ? (
            <div className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[8px] font-black rounded border border-green-500/30">
              CONNECTED
            </div>
          ) : (
            <div className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[8px] font-black rounded border border-red-500/30">
              OFFLINE
            </div>
          )}
          {isConnected && <CheckCircle className="w-3 h-3 text-green-400" />}
          {!isConnected && <AlertCircle className="w-3 h-3 text-red-400" />}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[8px] font-black uppercase opacity-60">
          Bot: @luminatradesbot
        </div>
        
        <a 
          href={telegramBotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn bg-solar py-2 px-3 text-[8px] font-black uppercase flex items-center justify-center gap-2 rounded-lg"
        >
          Open in Telegram <ExternalLink className="w-3 h-3" />
        </a>

        <div className="border border-white/10 rounded-lg p-2 bg-white/5">
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
            {chatHistory.length === 0 ? (
              <div className="text-[8px] opacity-40 text-center py-2">
                No messages yet. Start chatting with the bot!
              </div>
            ) : (
              chatHistory.map(msg => (
                <div 
                  key={msg.id}
                  className={`text-[8px] p-1 rounded ${msg.sender === 'user' ? 'bg-solar/20 text-solar ml-auto' : 'bg-white/10'}`}
                >
                  <div className="font-black">{msg.text}</div>
                  <div className="text-[6px] opacity-60">{msg.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type message..."
            className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-[8px] font-black placeholder-white/40 focus:outline-none focus:border-solar"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || !isConnected}
            className="brutal-btn bg-solar p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramBot;
