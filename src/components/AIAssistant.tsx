import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Sparkles, Clock, BarChart3, User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "How much time did I spend on Project A last month?",
  "What's my average daily productivity?",
  "Which tasks are overdue?",
  "Generate a weekly time report",
  "Show my most productive hours",
  "Compare this week vs last week"
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI assistant. I can help you analyze your productivity data, generate reports, and answer questions about your time tracking. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue("");
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("time") && lowerQuestion.includes("project a")) {
      return "Based on your data, you spent 42 hours and 30 minutes on Project A last month. This represents a 15% increase compared to the previous month. Your most productive days were Tuesdays and Thursdays.";
    }
    
    if (lowerQuestion.includes("productivity") || lowerQuestion.includes("average")) {
      return "Your average daily productivity is 6 hours and 15 minutes. Your peak productivity hours are between 9 AM and 11 AM, with a secondary peak from 2 PM to 4 PM. You're 12% more productive on Tuesdays compared to your weekly average.";
    }
    
    if (lowerQuestion.includes("overdue")) {
      return "You currently have 3 overdue tasks: 'API Documentation' (2 days overdue), 'User Testing Report' (1 day overdue), and 'Database Migration' (5 days overdue). Would you like me to suggest a priority order for completing these?";
    }
    
    if (lowerQuestion.includes("report")) {
      return "I can generate various reports for you. This week you logged 28 hours across 12 tasks, with Website Redesign taking 40% of your time. Your billable hours were 24 out of 28 total hours. Would you like a detailed breakdown by project or day?";
    }

    return "I understand you're asking about your productivity data. Based on your recent activity, you've been maintaining good consistency in your work patterns. Is there a specific metric or time period you'd like me to analyze?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg gap-2"
        >
          <Brain className="h-5 w-5" />
          AI Assistant
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-96">
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4 p-4">
          {/* Messages */}
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Try asking:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-accent"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}