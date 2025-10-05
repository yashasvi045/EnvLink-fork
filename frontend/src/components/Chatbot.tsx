import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
  text: "Hello! I'm your EnvLink assistant. I can help you with AQI information, health advice, and environmental data. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("aqi") || lowerInput.includes("air quality")) {
      return "The current AQI in San Francisco is 42, which is Good! This means air quality is satisfactory and poses little or no risk. It's a great day for outdoor activities!";
    }
    if (lowerInput.includes("exercise") || lowerInput.includes("outdoor")) {
      return "With the current AQI of 42, it's perfectly safe for outdoor exercise! I recommend activities like running, cycling, or hiking. The air quality is excellent today.";
    }
    if (lowerInput.includes("health") || lowerInput.includes("advice")) {
      return "Based on today's air quality: ✓ Safe for all outdoor activities ✓ No mask needed ✓ Keep windows open for ventilation ✓ Great day for children to play outside";
    }
    if (lowerInput.includes("trip") || lowerInput.includes("route")) {
      return "I can help you plan a trip with optimal air quality! Use the Trip Planner to see AQI forecasts along your route. Would you like me to suggest the cleanest route for your journey?";
    }
    
    return "I can provide information about air quality, health recommendations, trip planning, and environmental data. Feel free to ask me anything about AQI or air quality!";
  };

  const quickQuestions = [
    "What's the current AQI?",
    "Is it safe to exercise outside?",
    "Give me health advice",
    "Plan a trip for me",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 md:pb-8 px-4" style={{ paddingTop: '140px' }}>
      <div className="max-w-4xl mx-auto">
  <h1 className="text-3xl md:text-4xl text-[#1F2937] mb-2">EnvLink Assistant</h1>
        <p className="text-[#6B7280] mb-8">Ask me anything about air quality and environmental health</p>

        <Card className="bg-white shadow-lg border-0 flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user" ? "bg-[#6B7280]" : "bg-[#3B82F6]"
                }`}>
                  {message.sender === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-[#6B7280] text-white rounded-tr-sm"
                      : "bg-blue-50 text-[#1F2937] rounded-tl-sm border border-blue-100"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-gray-300" : "text-[#6B7280]"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-[#6B7280] mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(question)}
                    className="px-4 py-2 bg-blue-50 text-[#3B82F6] rounded-full text-sm hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about air quality, health advice, or trip planning..."
                className="flex-1 border-gray-300"
              />
              <Button
                onClick={handleSend}
                className="bg-[#3B82F6] hover:bg-[#2563EB] px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
