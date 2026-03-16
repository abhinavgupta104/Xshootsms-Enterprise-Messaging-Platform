import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// In local dev, leave this empty to use the Vite proxy (/api).
// In production, default to same-origin Netlify redirects unless a valid external API URL is provided.
const rawApiBase = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const localApiBasePattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
const API_BASE = import.meta.env.PROD && localApiBasePattern.test(rawApiBase) ? '' : rawApiBase;
const apiUrl = (path: '/api/chat' | '/api/lead') => `${API_BASE}${path}`;

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');

    // Quick Replies / Suggested Prompts
    const SUGGESTED_PROMPTS = [
        "What are the pricing tiers?",
        "How do I get an API key?",
        "Talk to sales"
    ];

    // Load messages from localStorage, or use default starter message
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('chatHistory');
        return saved ? JSON.parse(saved) : [
            { role: 'assistant', content: 'Hi there! I am the XshootSMS AI assistant. How can I help you today?' }
        ];
    });
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Lead Capture State
    const [userInfo, setUserInfo] = useState<{ name: string, phone: string } | null>(() => {
        const saved = localStorage.getItem('chatUserInfo');
        return saved ? JSON.parse(saved) : null;
    });
    const [captureName, setCaptureName] = useState('');
    const [capturePhone, setCapturePhone] = useState('');

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captureName.trim() || !capturePhone.trim()) return;
        const info = { name: captureName, phone: capturePhone };
        setUserInfo(info);
        localStorage.setItem('chatUserInfo', JSON.stringify(info));

        // Send lead data to our secure Netlify backend -> Google Sheets
        try {
            const response = await fetch(apiUrl('/api/lead'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...info, source: "Chatbot" })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `Lead API failed (${response.status})`);
            }

            console.log("Lead successfully sent to backend.");
        } catch (error) {
            console.error('Failed to save new lead to Google Sheets', error);
        }
    };

    const handleClearHistory = () => {
        if (window.confirm('Clear chat history and user details?')) {
            setMessages([{ role: 'assistant', content: 'Hi there! I am the XshootSMS AI assistant. How can I help you today?' }]);
            setUserInfo(null);
            setCaptureName('');
            setCapturePhone('');
            localStorage.removeItem('chatHistory');
            localStorage.removeItem('chatUserInfo');
        }
    };

    // Save to localStorage whenever messages change
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }, [messages]);

    // Auto-focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e?: React.FormEvent, promptOverride?: string) => {
        e?.preventDefault();
        const textToSend = promptOverride || input;
        if (!textToSend.trim()) return;

        const newMessages = [...messages, { role: 'user', content: textToSend }];
        setMessages(newMessages as Message[]);
        setInput('');
        setIsLoading(true);

        try {
            // This URL will point to our serverless API route
            const response = await fetch(apiUrl('/api/chat'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    userInfo: userInfo
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Chat API failed (${response.status})`);
            }

            const data = await response.json();

            // Add typing effect by simulating character stream
            const fullReply = data.reply;
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            let i = 0;
            const typingInterval = setInterval(() => {
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = fullReply.slice(0, i + 1);
                    return updated;
                });
                i++;
                if (i >= fullReply.length) {
                    clearInterval(typingInterval);
                }
            }, 10); // 10ms per character

        } catch (error) {
            console.error('Chat API request failed:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={20} />
                            <div>
                                <h3 className="font-semibold leading-tight">Support Chat</h3>
                                <p className="text-xs text-primary-foreground/80">Answers instantly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleClearHistory}
                                className="text-xs hover:underline opacity-80"
                            >
                                Clear
                            </button>
                            <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {!userInfo ? (
                        <div className="flex-1 p-6 flex flex-col justify-center bg-gray-50 dark:bg-gray-950/50">
                            <div className="text-center mb-6">
                                <h4 className="text-lg font-semibold text-foreground">Welcome to Support</h4>
                                <p className="text-sm text-muted-foreground mt-2">Please enter your details so our team can follow up with you if we get disconnected.</p>
                            </div>
                            <form onSubmit={handleStartChat} className="space-y-4">
                                <div className="space-y-1.5 text-left">
                                    <label className="text-sm font-medium text-foreground">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            required
                                            value={captureName}
                                            onChange={(e) => setCaptureName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-9 pr-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="tel"
                                            required
                                            value={capturePhone}
                                            onChange={(e) => setCapturePhone(e.target.value)}
                                            placeholder="+1 234 567 890"
                                            className="w-full pl-9 pr-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!captureName.trim() || !capturePhone.trim()}
                                    className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity mt-4"
                                >
                                    Start Chatting
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            {/* Messages Area */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950/50 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 text-sm prose dark:prose-invert prose-sm ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm [&_p]:text-primary-foreground'
                                            : 'bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl rounded-tl-sm text-foreground shadow-sm'
                                            }`}>
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}

                                {/* Suggested Prompts (only show if it's the very first message) */}
                                {messages.length === 1 && !isLoading && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {SUGGESTED_PROMPTS.map((prompt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => sendMessage(undefined, prompt)}
                                                className="text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-3 py-1.5 transition-colors"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-3 rounded-2xl rounded-tl-sm shadow-sm flex space-x-1 items-center h-[44px]">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800 flex gap-2 items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 rounded-full border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
                                >
                                    <Send size={18} className="ml-0.5" />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                >
                    <MessageCircle size={28} />
                </button>
            )}
        </div>
    );
}
