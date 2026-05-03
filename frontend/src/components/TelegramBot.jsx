// Telegram bot integration component
import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const TelegramBot = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/luminatradesbot';

  // Initialize bot connection status
  useEffect(() => {
    checkTelegramStatus();
  }, []);

  // Check bot connection status
  const checkTelegramStatus = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(Boolean(import.meta.env.VITE_TELEGRAM_BOT_URL));
      setIsLoading(false);
    } catch (error) {
      console.error('Telegram bot connection failed:', error);
      setIsConnected(false);
      setIsLoading(false);
    }
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
        {!isConnected && (
          <div className="text-[8px] opacity-60 text-center py-2">
            Set `VITE_TELEGRAM_BOT_URL` to enable live status.
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramBot;
