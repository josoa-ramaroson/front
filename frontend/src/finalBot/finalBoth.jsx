"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  DoorClosed,
  Flame,
  Heart,
  Smile,
  Frown,
  Briefcase,
  Users,
  MessageSquareOff,
  ChevronRight,
  Maximize,
  Minimize,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { api } from "../hooks/api";

export default function ChatBotTheEnd() {
  const [ouvrir, setOuvrir] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Bienvenue sur TheEnd.page! Je suis là pour vous aider à créer votre page de départ personnalisée. Que souhaitez-vous accomplir aujourd'hui?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [titre, setTitre] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(null);
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversation,setConversation] = useState([])

  // Simulating bot typing and response
  const handleSendMessage = (e, content = inputValue.trim()) => {

    e.preventDefault();
    if (content === "") return;

    const newUserMessage = { id: messages.length + 1, type: "user", content: content };
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    setShowSuggestions(false);

    setIsTyping(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        `${api}/conversations/create/`,
        { message: inputValue, domain: titre },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
        
      )
      .then((res) =>{
        axios.get(`${api}/conversations/`, 
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then(res=>{
          setConversation(res.data)})
        .catch(err=>console.log(err))
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err.message);
      });

      

      
  };

  let newMessages = [];
      conversation.forEach((conversation) => {
        conversation.messages.forEach((msg, index) => {
          const messageExists = messages.some((existingMsg) => existingMsg.id === msg.id);
          if (!messageExists) {
            newMessages.push({
              id: msg.id,
              type: msg.is_from_user ? "user" : "bot",
              content: msg.content,
            });
          }
        });
      });

      // Trier les messages par ID pour garantir l'ordre
      newMessages.sort((a, b) => a.id - b.id);

      if (newMessages.length > 0)
      {
        newMessages.length > 0 && setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setIsTyping(false);
    }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e); // Pass the event to handleSendMessage
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  

  // Animation pour l'icône du chatbot
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } },
    tap: { scale: 0.9 },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0)", "0 0 0 10px rgba(220, 38, 38, 0.3)", "0 0 0 0 rgba(220, 38, 38, 0)"],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  };

  // Animation pour les particules autour du bouton
  const renderParticles = () => {
    if (!buttonHovered) return null;

    return Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1.5 h-1.5 rounded-full ${
          i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-orange-500" : "bg-yellow-500"
        }`}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, (Math.random() - 0.5) * 50],
          y: [0, (Math.random() - 0.5) * 50],
        }}
        transition={{
          duration: 1 + Math.random() * 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          delay: i * 0.1,
        }}
        style={{
          left: "50%",
          top: "50%",
        }}
      />
    ));
  };

  // Effet de flamme pour le bouton
  const renderButtonFlame = () => {
    if (!buttonHovered) return null;

    return (
      <div className="absolute -bottom-2 z-10 left-0 right-0 h-6 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`flame-${i}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [-5, -20], opacity: [0.8, 0] }}
            transition={{
              duration: 0.8 + Math.random() * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: Math.random() * 0.5,
            }}
            className={`absolute bottom-0 rounded-full ${
              i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-orange-500" : "bg-yellow-500"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 15 + 5}px`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`font-sans ${darkMode ? "text-white" : "text-gray-900"} flex flex-col items-center justify-center p-4`}
    >
      {/* Main Content */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat Bot Interface */}
          <div className="relative h-full">
            <div className={`fixed bottom-6 left-6 z-50 ${expanded ? "w-full max-w-md" : ""}`}>
              <AnimatePresence mode="wait">
                {!ouvrir ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="relative"
                  >
                    <motion.button
                      onClick={() => setOuvrir(true)}
                      variants={buttonVariants}
                      initial="initial"
                      animate={buttonHovered ? "hover" : "pulse"}
                      whileHover="hover"
                      whileTap="tap"
                      onHoverStart={() => setButtonHovered(true)}
                      onHoverEnd={() => setButtonHovered(false)}
                      className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-red-600 to-yellow-600 text-white transition-all duration-300 shadow-lg shadow-red-500/30"
                    >
                      <MessageCircle size={28} />
                    </motion.button>
                    {renderParticles()}
                    {renderButtonFlame()}

                    {/* Bulle de notification */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", damping: 20 }}
                      className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full px-2 py-1 text-xs font-bold shadow-md border border-red-200 flex items-center"
                    >
                      <Sparkles size={10} className="mr-1" /> Nouveau
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className={`rounded-2xl shadow-xl overflow-hidden flex flex-col ${
                      darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
                    } ${expanded ? "h-[80vh]" : "h-[500px]"} w-full max-w-md`}
                    style={{
                      boxShadow: darkMode
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(239, 68, 68, 0.2)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    {/* Chat Header */}
                    <div
                      className={`p-4 flex justify-between items-center ${
                        darkMode
                          ? "bg-gradient-to-r from-red-900 to-yellow-900 border-b border-gray-800"
                          : "bg-gradient-to-r from-red-600 to-yellow-600 text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <img src=""/>
                          <img src="https://res.cloudinary.com/dysrhzaib/image/upload/v1747049132/petitRoboto_ycsoda.png" alt="robot" className="w-10 h-10 object-contain" />
                        <h3 className="font-medium text-white" style={{fontFamily:"Roboto"}}>AssistantEnd</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpanded(!expanded)}
                          className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
                        >
                          {expanded ? <Minimize size={18} /> : <Maximize size={18} />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setOuvrir(false)}
                          className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
                        >
                          <X size={18} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                      className={`flex-grow overflow-y-auto p-4 space-y-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
                      style={{fontFamily:"Roboto"}}
                    >
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs rounded-2xl px-4 py-2 ${
                              message.type === "user"
                                ? "bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-md shadow-red-500/20"
                                : darkMode
                                  ? "bg-gray-800 text-white shadow-md shadow-black/10"
                                  : "bg-white text-gray-800 shadow-md shadow-gray-200/50"
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                            } shadow-sm`}
                          >
                            <div className="flex space-x-2">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                                className="w-2 h-2 rounded-full bg-red-500"
                              ></motion.div>
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: 0.15,
                                }}
                                className="w-2 h-2 rounded-full bg-orange-500"
                              ></motion.div>
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  delay: 0.3,
                                }}
                                className="w-2 h-2 rounded-full bg-yellow-500"
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions de questions rapides */}
                    <AnimatePresence>
                      {showSuggestions && messages.length > 0 && messages[messages.length - 1].type === "bot" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`px-4 py-3 ${
                            darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"
                          }`}
                        >
                          <p className={`text-xs mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Sur quelle question voulais vous posez ?
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setTitre("CONSEIL");
                              }}
                              className={`text-xs px-3 py-1.5 rounded-full ${
                                darkMode
                                  ? "bg-gradient-to-r from-red-900/70 to-yellow-900/70 hover:from-red-900 hover:to-yellow-900 text-white"
                                  : "bg-gradient-to-r from-red-100 to-yellow-100 hover:from-red-200 hover:to-yellow-200 text-red-800"
                              } transition-colors flex items-center shadow-sm`}
                            >
                              <span style={{fontFamily:"Inter"}}>CONSEIL</span>
                              <ChevronRight size={14} className="ml-1 opacity-70" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setTitre("REHABILITATION");
                              }}
                              className={`text-xs px-3 py-1.5 rounded-full ${
                                darkMode
                                  ? "bg-gradient-to-r from-red-900/70 to-yellow-900/70 hover:from-red-900 hover:to-yellow-900 text-white"
                                  : "bg-gradient-to-r from-red-100 to-yellow-100 hover:from-red-200 hover:to-yellow-200 text-red-800"
                              } transition-colors flex items-center shadow-sm`}
                            >
                              <span style={{fontFamily:"Inter"}}>REHABILITATION</span>
                              <ChevronRight size={14} className="ml-1 opacity-70" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>


                    {/* Chat Input */}
                    <div
                      className={`p-4 ${
                        darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"
                      }`}
                    >
                      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Posez votre question..."
                          className={`flex-grow px-4 py-3 rounded-lg ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500/50"
                              : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500/30"
                          } focus:outline-none border transition-colors`}
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg bg-gradient-to-r from-red-600 to-yellow-600 text-white transition-all shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30"
                        >
                          <Send size={18} />
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}