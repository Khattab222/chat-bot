
import {  Bot, ChevronDown, MessageSquare, X } from 'lucide-react'

import ChatForm from './components/ChatForm'
import { useEffect, useRef, useState } from 'react'
import ChatMessage from './components/ChatMessage'
import companyInfo from '../src/assets/companyInfo.json'
import './App.css'

function App() {
  const [chatHistory, setChatHistory] = useState([{hideInChat:true, role:"model",text: `You are a helpful assistant for the following company:\n${JSON.stringify(companyInfo, null, 2)}`}])
  const [showChatBot, setShowChatBot] = useState(false)
  const chatBodyRef = useRef(null);

    const generateBotResponse = async (history)=>{
      // Function to update chat history with the bot's response
      // This function will be called after the bot processes the user's message
      const updateHistory = (text,isError=false)=>{
        setChatHistory(prevHistory=>[...prevHistory.filter(msg=>msg.text !=="Thinking......"),{role:"model",text,isError}])
      }


      history = history.map(({role,text})=>({role,parts:[{text}]}));

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({contents:history})
      };

      try {
        const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message || 'Failed to fetch response');
        }
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistory(apiResponseText)
      } catch (error) {
      updateHistory(error.message,true)
      }
    };


    useEffect(() => {
      // Scroll to the bottom of the chat body when chat history changes
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }

    }, [chatHistory])



  return (
    <div className={`container ${showChatBot ? 'show-chatbot' : ''}`}>
      <button onClick={() => setShowChatBot(!showChatBot)} id='chatbot-toggler'>
        {
          showChatBot?  <span> <X /></span> :  <span> <MessageSquare color='#fff' fill='#fff' /></span>
        }
      
      
      </button>
    <div className=' chat-popup'>

    
      <div className='chat-header  '>
      <div className='flex gap-1 items-center'> 
          <Bot color='#6d4fc2' className='bg-white rounded-full ' size={27} />
        <h1 className='font-bold text-lg'>chatbot</h1>
        </div>
      <ChevronDown onClick={() => setShowChatBot(!showChatBot)} className='bg-[#6d4fc2] rounded-full hover:bg-[#593bab] cursor-pointer  transition duration-200 ' />
        </div>

        {/* chat body */}
        <div ref={chatBodyRef} className='chat-body'>
          <div className={`message bot-message`}>
              <Bot color='#6d4fc2' size={20} />
                <p className='message-text'>hey how can i help you !</p>
              </div>
    
    {
      chatHistory.map((chat,i)=>{
        return(  <ChatMessage key={i} chat={chat} />)
      })
    }
    
        </div>

        {/* chat footer */}
        <div className='chat-footer'>
        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
        </div>
    </div>
  )
}

export default App
