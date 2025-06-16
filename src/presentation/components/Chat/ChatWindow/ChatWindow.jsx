import { useState, useRef, useEffect } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { useStore, useTheme } from "../../../../application/utils/hooks";
import QuickActions from "../QuickActions/QuickActions";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./ChatWindow.css";
import { generateContentWithGemini } from "../../../../infrastructure/api/gemini_service/geminiService";

const ChatWindow = () => {
  const { theme } = useTheme();
  const [{ transactions }] = useStore();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: {
        text: "Hello! I'm your financial advisor. How can I help today?",
        intent: "greeting",
        data: null,
        visualization: null,
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages((m) => [...m, { sender: "user", content: { text: input.trim(), intent: "user_input" } }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateContentWithGemini(input.trim(), transactions);
      setMessages((m) => [...m, { sender: "bot", content: response }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          sender: "bot",
          content: {
            text: "Sorry, something went wrong. Please try again.",
            intent: "error",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chat-window card ${theme}-mode`}>
      <ListGroup className="cw-messages">
        {messages.map((msg, i) => (
          <Message key={i} sender={msg.sender} content={msg.content} />
        ))}
        {isLoading && (
          <ListGroup.Item className="cw-loading">
            <Spinner animation="border" size="sm" /> Analyzing…
          </ListGroup.Item>
        )}
        <div ref={endRef} />
      </ListGroup>

      {messages.length === 1 && <QuickActions actions={["Show me a pie chart of my spending by category", "Analyze my income vs expenses", "What are my spending trends this month?", "Give me budget recommendations", "Show summary of all transactions"]} onClick={setInput} disabled={isLoading} />}

      <ChatInput value={input} onChange={setInput} onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
